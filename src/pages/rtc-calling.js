import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';

const socket = io('http://localhost:3000');

const App = () => {
    const [device, setDevice] = useState(null);
    const [producerTransport, setProducerTransport] = useState(null);
    const [consumerTransport, setConsumerTransport] = useState(null);
    const [producers, setProducers] = useState([]);
    const [consumers, setConsumers] = useState([]);
    const localStream = useRef(null);
    const remoteStream = useRef(null);

    useEffect(() => {
        const roomId = '6660dcb4dd80d7a98d64aa85';

        const createDevice = async (routerRtpCapabilities) => {
            const device = new mediasoupClient.Device();
            await device.load({ routerRtpCapabilities });
            setDevice(device);
        };

        const getRouterRtpCapabilities = async () => {
            socket.emit('getRouterRtpCapabilities', (routerRtpCapabilities) => {
                createDevice(routerRtpCapabilities);
            });
        };

        const joinRoom = () => {
            socket.emit('initiate-call', { roomId });
        };

        socket.on('connect', () => {
            console.log('Connected to server');
            getRouterRtpCapabilities();
        });

        socket.on('peers', ({ peers }) => {
            setProducers(peers);
        });

        socket.on('new-peer', ({ peerId }) => {
            setProducers((prevPeers) => [...prevPeers, peerId]);
        });

        socket.on('new-producer', async ({ producerId }) => {
            const { rtpCapabilities } = device;
            socket.emit('consume', { producerId, rtpCapabilities }, async ({ id, kind, rtpParameters, error }) => {
                if (error) {
                    console.error(error);
                    return;
                }

                const consumer = await consumerTransport.consume({
                    id,
                    producerId,
                    kind,
                    rtpParameters,
                });

                setConsumers((prev) => [...prev, consumer]);
                const track = consumer.track;
                remoteStream.current.srcObject = new MediaStream([track]);
                socket.emit('resume', consumer.id, () => {
                    console.log('Consumer resumed');
                });
            });
        });

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            localStream.current.srcObject = stream;

            socket.emit('create-producer-transport', async (params) => {
                const transport = device.createSendTransport(params);

                transport.on('connect', ({ dtlsParameters }, callback) => {
                    socket.emit('connect-producer-transport', { dtlsParameters }, callback);
                });

                transport.on('produce', ({ kind, rtpParameters }, callback) => {
                    socket.emit('produce', { kind, rtpParameters }, ({ id }) => callback({ id }));
                });

                const producer = await transport.produce({ track: stream.getAudioTracks()[0] });
                setProducerTransport(transport);
                console.log('Producer created', producer);
            });

            socket.emit('create-consumer-transport', (params) => {
                const transport = device.createRecvTransport(params);

                transport.on('connect', ({ dtlsParameters }, callback) => {
                    socket.emit('connect-consumer-transport', { dtlsParameters }, callback);
                });

                setConsumerTransport(transport);
            });
        });

        joinRoom();

        return () => {
            socket.disconnect();
        };
    }, [device]);

    return (
        <div>
            <h1>Voice Call</h1>
            <audio ref={localStream} autoPlay muted />
            <audio ref={remoteStream} autoPlay />
        </div>
    );
};

export default App;
