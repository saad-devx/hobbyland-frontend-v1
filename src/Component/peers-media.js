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

    return <div key={props.index} className="relative h-full aspect-video rounded-xl flex flex-col justify-center items-center bg-black/40 backdrop-blur overflow-hidden">
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
        /> : <div className="w-32 aspect-square flex justify-center items-center rounded-full text-3xl text-gray-200 border-4 border-gray-400 font-bold uppercase">--</div>}
        <span className="absolute left-1/2 -translate-x-1/2 bottom-4 text-xl text-white">{name}</span>
    </div>
}
export default PeersMedia;