import { useEffect, useState } from "react";
import PeersMedia from "@/Component/peers-media";
import { Icon } from "@iconify/react";

export default function MeetingModal({ userData, otherPeers, isAudio, isVideo, stopAudio, produceAudio, stopVideo, produceVideo, videoRef, closeMeeting }) {
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [devices, setDevices] = useState({ audio: [], video: [] });
    const [selectedDevice, setSelectedDevice] = useState({ audio: null, video: null });

    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audio = devices.filter(device => device.kind === 'audioinput' && device.deviceId !== "default");
            const video = devices.filter(device => device.kind === 'videoinput');
            setDevices({ audio, video });
            if (audio.length > 0) {
                const { deviceId } = audio[0];
                setSelectedDevice(prev => ({ ...prev, audio: deviceId }));
                produceAudio(deviceId);
            }
            if (video.length > 0) setSelectedDevice(prev => ({ ...prev, video: video[0].deviceId }));
        })();
    }, []);
    console.log("SELECTED DEVICE: ", selectedDevice)

    const onAudioChange = (deviceId) => {
        if (deviceId === selectedDevice.audio) return console.log("Already using the same audio device.");
        setSelectedDevice(prev => ({ ...prev, audio: deviceId }));
        stopAudio();
        produceAudio(deviceId);
    }

    const onVideoChange = (deviceId) => {
        if (deviceId === selectedDevice.video) return console.log("Already using the same video device.");
        setSelectedDevice(prev => ({ ...prev, video: deviceId }));
        stopVideo();
        produceVideo(deviceId);
    }

    return <section className="meeting-screen call-mesh-background">
        <nav className="peer-container-wrapper">

            <div className="peer-container">
                {isVideo ? <video
                    className="w-full h-full object-cover"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    controls={false}
                /> : <div className="peer-avatar">{userData?.firstname?.slice(0, 1)}</div>}
                <span className="peer-title">You</span>
            </div>
            {otherPeers.map((peer, index) => <PeersMedia index={index} peer={peer} />)}
        </nav>

        <div style={{ transform: settingsMenu ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)" }} className="settings-menu">
            <span className="settings-heading">Audio Input Devices</span>
            <div className="input-devices truncate">
                {devices.audio.map(device => <button onClick={() => onAudioChange(device.deviceId)} key={device.deviceId} title={device.label} style={{ backgroundColor: (device.deviceId === selectedDevice.audio) ? "#c8d1e0" : "none" }} className="input-devices-item">
                    {device.label}
                </button>)}
            </div>
            <span className="settings-heading">Video Input Devices</span>
            <div className="input-devices truncate">
                {devices.video.map(device => <button onClick={() => onVideoChange(device.deviceId)} key={device.deviceId} title={device.label} style={{ backgroundColor: (device.deviceId === selectedDevice.video) ? "#c8d1e0" : "none" }} className="input-devices-item">
                    {device.label}
                </button>)}
            </div>
        </div>

        <nav className="meeting-tool-bar">
            <button onClick={() => setSettingsMenu(prev => !prev)} title="Settings" className="meeting-tool-bar-item">
                <Icon icon="fluent:slide-settings-24-filled" />
            </button>
            <button onClick={() => isAudio ? stopAudio() : produceAudio()} title="Toggle Mic" className="meeting-tool-bar-item">
                {isAudio ? <Icon icon="eva:mic-fill" /> : <Icon icon="eva:mic-off-fill" />}
            </button>
            <button onClick={() => isVideo ? stopVideo() : produceVideo()} title="Toggle Camera" className="meeting-tool-bar-item">
                {isVideo ? <Icon icon="majesticons:camera-off" /> : <Icon icon="heroicons:video-camera-solid" />}
            </button>
            <button onClick={closeMeeting} title="End Call" className="meeting-tool-bar-item tilt-on-hover">
                <Icon fontSize={42} icon="solar:end-call-bold" color="red" />
            </button>
        </nav>
    </section>
}
