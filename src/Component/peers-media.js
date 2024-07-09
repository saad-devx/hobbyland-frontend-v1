import { useEffect, useRef } from "react";

const PeersMedia = (props) => {
    const { name, audioStream, vidStream } = props.peer;
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    console.log("The individual peer: ", props.peer)

    useEffect(() => {
        if (audioStream && audioRef.current) {
            audioRef.current.srcObject = audioStream;
            audioRef.current.volume = 1.0
        }
        if (vidStream && videoRef.current) videoRef.current.srcObject = vidStream;
    }, [audioStream, vidStream]);

    return <div key={props.index} className="peer-container">
        {audioStream && <audio
            ref={audioRef}
            onLoadedMetadata={() => audioRef.current.play()}
            onCanPlay={() => audioRef.current.play()}
            autoPlay
            controls={false}
            hidden
        />}
        {vidStream ? <video
            className="w-full h-full object-cover"
            ref={videoRef}
            onLoadedMetadata={() => videoRef.current.play()}
            autoPlay
            playsInline
            controls={false}
        /> : <div className="peer-avatar">--</div>}
        <span className="peer-title">{name}</span>
    </div>
}
export default PeersMedia;