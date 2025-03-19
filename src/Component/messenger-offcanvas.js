import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, SearchIcon, MessagesSquare, StarIcon, Clock, Settings, ChevronRight, SendHorizontal, ChevronLeft, Video, Phone, Maximize2, Paperclip, Smile, MoreVertical, Mic, MicOff, VideoOff } from 'lucide-react';
import { FectchRooms } from '@/config/Axiosconfig/AxiosHandle/chat';
import { AuthToken } from '@/config/Axiosconfig/AxiosHandle/chat';
import { FetchMe } from '@/config/Axiosconfig/AxiosHandle/user';
import { BASECHATURL } from '@/config/Axiosconfig/index';
import moment from 'moment';
import createSocket from '@/lib/promisified-io';
import * as mediasoupClient from 'mediasoup-client';

const MessengerOffcanvas = ({ show = false, setShow }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [showChat, setShowChat] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    // Call-related state
    const [callActive, setCallActive] = useState(false);
    const [callType, setCallType] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState({});
    const [peers, setPeers] = useState({});
    const [micMuted, setMicMuted] = useState(false);
    const [videoOff, setVideoOff] = useState(false);
    const [callLoading, setCallLoading] = useState(false);
    const [callError, setCallError] = useState(null);

    const socketRef = useRef(null);
    const rtcSocketRef = useRef(null);
    const deviceRef = useRef(null);
    const producerTransportRef = useRef(null);
    const consumerTransportRef = useRef(null);
    const producersRef = useRef(new Map());
    const consumersRef = useRef(new Map());
    const typingTimeoutRef = useRef(null);
    const messagesEndRef = useRef(null);
    const localVideoRef = useRef(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const activeRoomRef = useRef(activeRoom);

    useEffect(() => {
        activeRoomRef.current = activeRoom;
    }, [activeRoom]);

    const getRoomTitle = (room = activeRoom) => {
        if (room?.members?.length === 2) {
            const member = room?.members?.find(member => member._id !== currentUser?._id);
            return member?.firstname || member?.username;
        }
        return room?.title;
    };

    const scrollToBottom = (smooth = false) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    // Fetch current user
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const res = await FetchMe();
                setCurrentUser(res.data.user);
            } catch (error) {
                console.log('User not logged in');
            }
        };
        if (show) {
            fetchLoggedInUser();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [show]);

    // Initialize Chat Socket
    useEffect(() => {
        const initializeChatSocket = async () => {
            try {
                setLoading(true);
                const response = await AuthToken();
                const token = response.data.token;

                socketRef.current = createSocket(BASECHATURL, token);

                socketRef.current.on('connect', () => {
                    console.log('Connected to chat server');
                });

                socketRef.current.on('connect_error', (error) => {
                    console.error('Chat socket connection error:', error);
                    setError('Failed to connect to chat server');
                });

                socketRef.current.on('new_message', (data) => {
                    if (data.room_id === activeRoomRef.current?._id) {
                        setMessages((prev) => {
                            const tempMessageIndex = prev.findIndex((msg) => msg._id === data.tempId);
                            if (tempMessageIndex !== -1) {
                                const newMessages = [...prev];
                                newMessages[tempMessageIndex] = { ...data, status: 'sent' };
                                return newMessages;
                            }
                            return [...prev, data];
                        });
                        scrollToBottom();
                    }
                    setRooms((prev) =>
                        prev.map((room) =>
                            room._id === data.room_id
                                ? {
                                    ...room,
                                    last_message: {
                                        content: data.content,
                                        createdAt: data.createdAt,
                                        author: data.author,
                                    },
                                }
                                : room
                        )
                    );
                });

                socketRef.current.on('room_messages', ({ success, messages, page, total_pages }) => {
                    if (success) {
                        const sortedMessages = [...messages].sort(
                            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                        );
                        setMessages((prev) => (page > 1 ? [...sortedMessages, ...prev] : sortedMessages));
                        setTotalPages(total_pages);
                        setPage(page);
                        setMessageLoading(false);
                        scrollToBottom();
                    } else {
                        setMessageError('Failed to fetch messages');
                        setMessageLoading(false);
                    }
                });
            } catch (error) {
                console.error('Failed to initialize chat socket:', error);
                setError('Failed to connect to chat server');
            } finally {
                setLoading(false);
            }
        };

        initializeChatSocket();

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Initialize RTC Socket
    useEffect(() => {
        const initializeRTCSocket = async () => {
            try {
                const response = await AuthToken();
                const token = response.data.token;

                const RTC_SERVER_URL = process.env.NEXT_PUBLIC_RTC_SERVER_URL || 'http://localhost:8002';
                rtcSocketRef.current = createSocket(RTC_SERVER_URL, token);

                rtcSocketRef.current.on('connect', () => {
                    console.log('Connected to RTC server');
                });

                rtcSocketRef.current.on('connect_error', (error) => {
                    console.error('RTC socket connection error:', error);
                    setCallError('Failed to connect to RTC server');
                });

                rtcSocketRef.current.on('incoming-call', ({ room, caller }) => {
                    if (room._id === activeRoomRef.current?._id) {
                        const accept = window.confirm(`${caller.firstname} is calling. Accept?`);
                        if (accept) {
                            handleJoinCall('video'); // Default to video for consistency
                            rtcSocketRef.current.emit('accept-call', { room_id: room._id });
                        } else {
                            rtcSocketRef.current.emit('reject-call', { room_id: room._id });
                        }
                    }
                });

                rtcSocketRef.current.on('new-producer', async ({ producerID, socket_id }) => {
                    console.log('New producer:', producerID, 'from:', socket_id);
                    await consumeMedia(producerID, socket_id);
                });

                rtcSocketRef.current.on('new-peer', ({ socket_id, user }) => {
                    console.log('New peer:', user.firstname);
                    setPeers((prev) => ({
                        ...prev,
                        [socket_id]: user,
                    }));
                    // No immediate consumption here; wait for new-producer events
                });

                rtcSocketRef.current.on('leave', ({ socket_id }) => {
                    console.log('Peer left:', socket_id);
                    setRemoteStreams((prev) => {
                        const newStreams = { ...prev };
                        delete newStreams[socket_id];
                        return newStreams;
                    });
                    setPeers((prev) => {
                        const newPeers = { ...prev };
                        delete newPeers[socket_id];
                        return newPeers;
                    });
                    consumersRef.current.get(socket_id)?.forEach((consumer) => consumer.close());
                    consumersRef.current.delete(socket_id);
                });

                rtcSocketRef.current.on('call-rejected', () => {
                    setCallActive(false);
                    setCallError('Call was rejected');
                });

                rtcSocketRef.current.on('call-ended', () => {
                    endCall();
                });
            } catch (error) {
                console.error('Failed to initialize RTC socket:', error);
                setCallError('Failed to connect to RTC server');
            }
        };

        initializeRTCSocket();

        return () => {
            rtcSocketRef.current?.disconnect();
            cleanupCall();
        };
    }, []);

    // Mediasoup Setup
    const setupMediasoup = async () => {
        try {
            deviceRef.current = new mediasoupClient.Device();
            const data = await rtcSocketRef.current.asyncEmit('join-meeting', {
                room_id: activeRoomRef.current._id,
            });
            const { routerRtpCapabilities, producerTransportParams, consumerTransportParams, producers } = data;

            await deviceRef.current.load({ routerRtpCapabilities });

            producerTransportRef.current = deviceRef.current.createSendTransport(producerTransportParams);
            producerTransportRef.current.on('connect', async ({ dtlsParameters }, callback) => {
                await rtcSocketRef.current.asyncEmit('connect-producer-transport', { dtlsParameters });
                callback();
            });
            producerTransportRef.current.on('produce', async ({ kind, rtpParameters }, callback) => {
                const { id } = await rtcSocketRef.current.asyncEmit('produce', {
                    kind,
                    rtpParameters,
                    room_id: activeRoomRef.current._id,
                });
                callback({ id });
            });

            consumerTransportRef.current = deviceRef.current.createRecvTransport(consumerTransportParams);
            consumerTransportRef.current.on('connect', async ({ dtlsParameters }, callback) => {
                await rtcSocketRef.current.asyncEmit('connect-consumer-transport', { dtlsParameters });
                callback();
            });

            // Consume existing producers
            for (const producer of producers) {
                await consumeMedia(producer.producerID, producer.socket_id);
            }

            return true;
        } catch (error) {
            console.error('Mediasoup setup failed:', error);
            setCallError('Failed to setup call');
            return false;
        }
    };

    // Produce Media
    const produceMedia = async (type) => {
        try {
            // Define constraints based on call type
            const constraints = {
                audio: true,
                video: type === 'video'
            };

            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            // Store the stream for local use
            setLocalStream(stream);

            // Set the local video element source if video is enabled
            if (type === 'video' && localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            // Produce audio track
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !micMuted;
                const audioProducer = await producerTransportRef.current.produce({
                    track: audioTrack,
                    appData: { media_type: 'audio' }
                });

                producersRef.current.set(audioProducer.id, audioProducer);

                audioProducer.on('transportclose', () => {
                    console.log('Audio producer transport closed');
                    producersRef.current.delete(audioProducer.id);
                });

                audioProducer.on('trackended', () => {
                    console.log('Audio track ended');
                    audioProducer.close();
                    producersRef.current.delete(audioProducer.id);
                });
            }

            // Produce video track if this is a video call
            if (type === 'video') {
                const videoTrack = stream.getVideoTracks()[0];
                if (videoTrack) {
                    videoTrack.enabled = !videoOff;
                    const videoProducer = await producerTransportRef.current.produce({
                        track: videoTrack,
                        appData: { media_type: 'video' }
                    });

                    producersRef.current.set(videoProducer.id, videoProducer);

                    videoProducer.on('transportclose', () => {
                        console.log('Video producer transport closed');
                        producersRef.current.delete(videoProducer.id);
                    });

                    videoProducer.on('trackended', () => {
                        console.log('Video track ended');
                        videoProducer.close();
                        producersRef.current.delete(videoProducer.id);
                    });
                }
            }

            return true;
        } catch (error) {
            console.error('Error producing media:', error);
            setCallError(`Failed to access media: ${error.message}`);
            return false;
        }
    };

    // Consume Media
    const consumeMedia = async (producerId, socketId) => {
        try {
            const { rtpCapabilities } = deviceRef.current;
            const data = await rtcSocketRef.current.asyncEmit('consume', {
                producer_id: producerId,
                rtpCapabilities,
                socket_id: socketId,
            });
            console.log('Consuming:', { producerId, socketId, kind: data.kind });

            const consumer = await consumerTransportRef.current.consume({
                id: data.id,
                producerId: data.producerId,
                kind: data.kind,
                rtpParameters: data.rtpParameters,
            });

            // Store the consumer for later cleanup
            if (!consumersRef.current.has(socketId)) {
                consumersRef.current.set(socketId, new Map());
            }
            consumersRef.current.get(socketId).set(producerId, consumer);

            // Add track to existing stream or create a new one
            setRemoteStreams((prev) => {
                const existingStream = prev[socketId] || new MediaStream();

                // Check if this track type already exists in the stream
                const existingTracks = data.kind === 'video'
                    ? existingStream.getVideoTracks()
                    : existingStream.getAudioTracks();

                // Remove existing tracks of the same kind to avoid duplicates
                if (existingTracks.length > 0) {
                    existingTracks.forEach(track => existingStream.removeTrack(track));
                }

                // Add the new track
                existingStream.addTrack(consumer.track);
                console.log(`Added ${consumer.track.kind} track for ${socketId}`);

                return { ...prev, [socketId]: existingStream };
            });

            // Resume the consumer
            await rtcSocketRef.current.asyncEmit('resume', { producer_id: producerId });

            return consumer;
        } catch (error) {
            console.error('Error consuming media:', error);
            setCallError(`Failed to connect with peer: ${error.message}`);
        }
    };

    const handleStartCall = async (type = 'voice') => {
        try {
            setCallLoading(true);
            setCallError(null);
            setCallType(type);
            setCallActive(true);
            setVideoOff(type !== 'video');
            setMicMuted(false);

            const success = await setupMediasoup();
            if (!success) {
                throw new Error('Failed to setup call');
            }

            await produceMedia(type);
            await rtcSocketRef.current.asyncEmit('call-user', { room_id: activeRoomRef.current._id });

            console.log(`Started ${type} call in room ${activeRoomRef.current._id}`);
        } catch (error) {
            console.error('Failed to start call:', error);
            setCallError(`Failed to start call: ${error.message}`);
            setCallActive(false);
        } finally {
            setCallLoading(false);
        }
    };

    const handleJoinCall = async (type) => {
        try {
            setCallLoading(true);
            setCallError(null);
            setCallType(type);
            setCallActive(true);
            setVideoOff(type !== 'video');
            setMicMuted(false);

            const success = await setupMediasoup();
            if (!success) {
                throw new Error('Failed to setup call');
            }

            await produceMedia(type);

            console.log(`Joined ${type} call in room ${activeRoomRef.current._id}`);
        } catch (error) {
            console.error('Failed to join call:', error);
            setCallError(`Failed to join call: ${error.message}`);
            setCallActive(false);
        } finally {
            setCallLoading(false);
        }
    };

    const toggleMic = () => {
        try {
            if (!localStream) return;

            // Get all audio tracks
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length === 0) return;

            // Toggle enabled state on all audio tracks
            const newMutedState = !micMuted;
            audioTracks.forEach(track => {
                track.enabled = !newMutedState;
            });

            // Update UI state
            setMicMuted(newMutedState);

            console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
        } catch (error) {
            console.error('Error toggling microphone:', error);
            setCallError(`Failed to ${micMuted ? 'unmute' : 'mute'} microphone: ${error.message}`);
        }
    };

    const toggleVideo = async () => {
        if (!localStream) return;

        try {
            if (videoOff) {
                // Enable video
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const newVideoTrack = stream.getVideoTracks()[0];

                // Remove any existing video tracks
                localStream.getVideoTracks().forEach(track => {
                    track.stop();
                    localStream.removeTrack(track);
                });

                // Add the new video track to local stream
                localStream.addTrack(newVideoTrack);

                // Update the local video element
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = localStream;
                }

                // Produce the new video track
                const videoProducer = await producerTransportRef.current.produce({ track: newVideoTrack });
                producersRef.current.set(videoProducer.id, videoProducer);

                setVideoOff(false);
            } else {
                // Disable video
                const videoTracks = localStream.getVideoTracks();
                if (videoTracks.length > 0) {
                    // Stop all video tracks
                    videoTracks.forEach(track => {
                        track.stop();
                        localStream.removeTrack(track);
                    });

                    // Close video producers
                    for (const [id, producer] of producersRef.current.entries()) {
                        if (producer.track.kind === 'video') {
                            producer.close();
                            producersRef.current.delete(id);
                            await rtcSocketRef.current.asyncEmit('remove', {
                                producer_id: id,
                                room_id: activeRoomRef.current._id,
                            });
                        }
                    }

                    // Update local video element
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = localStream;
                    }

                    setVideoOff(true);
                }
            }
        } catch (err) {
            console.error('Error toggling video:', err);
            setCallError(`Failed to ${videoOff ? 'enable' : 'disable'} video: ${err.message}`);
        }
    };

    const endCall = () => {
        try {
            // Notify server that we're leaving the call
            if (activeRoomRef.current?._id && rtcSocketRef.current?.connected) {
                rtcSocketRef.current.emit('leave-meeting', { room_id: activeRoomRef.current._id });
            }

            // Clean up all media resources
            cleanupCall();

            // Reset call state
            setCallActive(false);
            setCallType(null);
            setLocalStream(null);
            setRemoteStreams({});
            setPeers({});
            setCallError(null);

            console.log('Call ended');
        } catch (error) {
            console.error('Error ending call:', error);
        }
    };

    const cleanupCall = () => {
        try {
            // Stop all local media tracks
            if (localStream) {
                localStream.getTracks().forEach(track => {
                    track.stop();
                });
            }

            // Close all producers
            producersRef.current.forEach(producer => {
                producer.close();
            });
            producersRef.current.clear();

            // Close all consumers
            consumersRef.current.forEach(consumers => {
                consumers.forEach(consumer => {
                    consumer.close();
                });
            });
            consumersRef.current.clear();

            // Close transport connections
            if (producerTransportRef.current) {
                producerTransportRef.current.close();
                producerTransportRef.current = null;
            }

            if (consumerTransportRef.current) {
                consumerTransportRef.current.close();
                consumerTransportRef.current = null;
            }

            // Clear video elements
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = null;
            }

            console.log('Media resources cleaned up');
        } catch (error) {
            console.error('Error cleaning up call resources:', error);
        }
    };

    useEffect(() => {
        if (activeRoom && socketRef.current) {
            setMessageLoading(true);
            setMessageError(null);
            setMessages([]);
            socketRef.current.emit('join_room', activeRoom._id);
            return () => {
                socketRef.current?.emit('leave_room', activeRoom._id);
            };
        }
    }, [activeRoom]);

    const loadMoreMessages = useCallback(() => {
        if (page < totalPages && !loadingMore && activeRoomRef.current) {
            setLoadingMore(true);
            socketRef.current?.emit('join_room', activeRoomRef.current._id, page + 1);
            setPage((prev) => prev + 1);
        }
    }, [page, totalPages, loadingMore]);

    const getRooms = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await FectchRooms();
            setRooms(res.data.rooms);
        } catch (error) {
            setError(error.message || 'An error occurred while fetching rooms');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRoomClick = (room) => {
        setShowChat(true);
        setActiveRoom(room);
        setPage(1);
        setMessages([]);
        setMessageLoading(true);
        setMessageError(null);
    };

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
        if (socketRef.current && activeRoomRef.current) {
            socketRef.current.emit('typing_start', { roomId: activeRoomRef.current._id });
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                socketRef.current?.emit('typing_end', { roomId: activeRoomRef.current._id });
            }, 1000);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && socketRef.current && activeRoomRef.current?._id) {
            const tempMessageId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const tempMessage = {
                _id: tempMessageId,
                author: currentUser._id,
                room_id: activeRoomRef.current._id,
                content: newMessage.trim(),
                files: [],
                type: 'message',
                deleted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'sending',
            };
            setMessages((prev) => [...prev, tempMessage]);
            socketRef.current.emit('send_message', {
                roomId: activeRoomRef.current._id,
                message: newMessage.trim(),
                tempId: tempMessageId,
            });
            scrollToBottom();
            setNewMessage('');
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
                socketRef.current.emit('typing_end', { roomId: activeRoomRef.current._id });
            }
        }
    };

    const filteredRooms = rooms.filter((room) =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    return (
        <>
            <div className={`fixed z-[70] top-0 right-0 h-screen w-[40%] bg-white transform transition-all duration-300 ease-in-out ${show ? 'translate-x-0' : 'translate-x-full'} shadow-[-8px_0_30px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden`}>
                <div className="relative h-48 bg-gradient-to-br from-orange-400 to-blue-500 rounded-bl-[6rem]">
                    <button
                        onClick={() => {
                            setShow(false);
                            setShowChat(false);
                        }}
                        className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-12 left-6">
                        <h2 className="text-white text-2xl font-semibold">Messages</h2>
                        <p className="text-white/80 text-sm">Connect with your network</p>
                    </div>
                </div>

                <div className="px-6 -mt-6 mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search conversations..."
                            className="w-full py-3 px-5 pr-12 rounded-3xl bg-white shadow-lg focus:outline-none outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        />
                        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <section
                    className={`absolute z-[75] bottom-0 -left-full right-0 w-full h-full flex flex-col bg-white/20 backdrop-blur origin-top ${!showChat ? 'pointer-events-none' : 'translate-x-full'} overflow-hidden transition-all duration-300`}
                >
                    <div className="p-3 border-b border-gray-100 bg-white/50 backdrop-blur-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setShowChat(false);
                                        setActiveRoom(null);
                                    }}
                                    className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <ChevronLeft className="text-gray-600" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-lg font-semibold">
                                            {getRoomTitle()?.slice(0, 1)}
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{getRoomTitle()}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleStartCall()}
                                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                                >
                                    <Phone size={20} />
                                </button>
                                <button
                                    onClick={() => handleStartCall('video')}
                                    className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                                >
                                    <Video size={20} />
                                </button>
                                <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                    <Maximize2 size={20} />
                                </button>
                                <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-6">
                        {messageLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : messageError ? (
                            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                                {messageError}
                                <button
                                    onClick={() => handleRoomClick(activeRoom)}
                                    className="ml-2 text-red-600 hover:text-red-700 underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-6">
                                {page < totalPages && (
                                    <button
                                        onClick={loadMoreMessages}
                                        className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {loadingMore ? 'Loading...' : 'Load earlier messages'}
                                    </button>
                                )}
                                {messages.map((message, index) => (
                                    <div key={message._id || index} className={`flex ${message.author?._id === currentUser?._id || message.author === currentUser?._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] group ${message.author?._id === currentUser?._id || message.author === currentUser?._id ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-2xl ${message.author?._id === currentUser?._id || message.author === currentUser?._id ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white' : 'bg-white shadow-sm border border-gray-100 text-gray-800'}`}>
                                                <p className="leading-relaxed">{message.content}</p>
                                                <div className={`flex justify-between items-center mt-2 text-xs ${message.author?._id === currentUser?._id ? 'text-white/70' : 'text-gray-400'}`}>
                                                    <span>{moment(message.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-white border-t border-gray-100">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                            <button type="button" className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                                <Paperclip size={20} />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={handleMessageChange}
                                    placeholder="Type your message..."
                                    className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-gray-400 transition-all"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
                                    <Smile size={20} />
                                </button>
                            </div>
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className={`p-3 rounded-xl transition-all shadow-lg shadow-purple-500/20 ${newMessage.trim() ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                <SendHorizontal size={20} />
                            </button>
                        </form>
                    </div>
                </section>

                <div className="px-6 mb-4">
                    <div className="flex space-x-2 bg-gray-50 p-1 rounded-xl">
                        {[
                            { id: 'recent', icon: Clock, label: 'Recent' },
                            { id: 'starred', icon: StarIcon, label: 'Starred' },
                            { id: 'all', icon: MessagesSquare, label: 'All' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-slate-800' : 'text-gray-500 hover:bg-white/50'}`}
                            >
                                <tab.icon size={16} className="mx-auto mb-1" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                            {error}
                            <button onClick={getRooms} className="ml-2 text-red-600 hover:text-red-700 underline">
                                Retry
                            </button>
                        </div>
                    ) : filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <div
                                key={room._id}
                                onClick={() => handleRoomClick(room)}
                                className="group mb-4 p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-400 flex items-center justify-center text-white font-medium">
                                        {getRoomTitle(room).slice(0, 1).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{getRoomTitle(room)}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {room.last_message?.content || 'No messages yet'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400">
                                            {room.last_message?.createdAt ? moment(room.last_message.createdAt).fromNow() : ''}
                                        </span>
                                        <ChevronRight className="text-slate-500 group-hover:translate-x-2 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            {searchQuery ? 'No rooms match your search' : 'No chat rooms available'}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100">
                    <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-3xl flex items-center justify-center space-x-2 transition-colors">
                        <Settings size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-600">Settings</span>
                    </button>
                </div>
            </div>

            {callActive && (
                <section className="fixed inset-0 z-[100] p-6 bg-gradient-to-br from-orange-500 to-blue-500 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={endCall}
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="text-white text-xl font-semibold">
                            {callType === 'video' ? 'Video Call' : 'Voice Call'} with {getRoomTitle()}
                        </h2>
                        <div className="w-10"></div> {/* Empty div for flex alignment */}
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
                        {/* Local user tile */}
                        <div className="bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center relative">
                            {!videoOff && callType === 'video' ? (
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-white text-3xl font-semibold">
                                    {currentUser?.firstname?.slice(0, 1).toUpperCase() || 'Me'}
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                                You {micMuted && <MicOff size={16} className="inline ml-1" />}
                            </div>
                        </div>

                        {/* Remote user tile */}
                        {Object.keys(peers).length > 0 ? (
                            Object.entries(remoteStreams).map(([socketId, stream]) => (
                                <div key={socketId} className="bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center relative">
                                    {stream && stream.getVideoTracks().length > 0 && stream.getVideoTracks()[0].enabled ? (
                                        <video
                                            autoPlay
                                            playsInline
                                            ref={(video) => {
                                                if (video && video.srcObject !== stream) {
                                                    video.srcObject = stream;
                                                }
                                            }}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-white text-3xl font-semibold">
                                            {peers[socketId]?.firstname?.slice(0, 1).toUpperCase() || 'User'}
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                                        {peers[socketId]?.firstname || 'Participant'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                                <div className="text-white text-center p-4">
                                    <div className="animate-pulse mb-2">
                                        <div className="w-16 h-16 mx-auto rounded-full bg-gray-600 flex items-center justify-center">
                                            <Clock size={32} className="text-gray-400" />
                                        </div>
                                    </div>
                                    <p>Waiting for participant to join...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex justify-center gap-6">
                        <button
                            onClick={toggleMic}
                            className={`p-4 rounded-full ${micMuted ? 'bg-red-500' : 'bg-white/20'} text-white hover:bg-opacity-80 transition-colors`}
                        >
                            {micMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>
                        {callType === 'video' && (
                            <button
                                onClick={toggleVideo}
                                className={`p-4 rounded-full ${videoOff ? 'bg-red-500' : 'bg-white/20'} text-white hover:bg-opacity-80 transition-colors`}
                            >
                                {videoOff ? <VideoOff size={24} /> : <Video size={24} />}
                            </button>
                        )}
                        <button
                            onClick={endCall}
                            className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {callLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    )}
                    {callError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="bg-red-500 text-white p-4 rounded-lg">
                                {callError}
                                <button onClick={() => setCallError(null)} className="ml-2 underline">
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

export default MessengerOffcanvas;