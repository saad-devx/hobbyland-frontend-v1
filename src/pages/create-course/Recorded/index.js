import React, { useState, useRef } from "react";

const VideoRecorder = () => {
  const [recordedVideo, setRecordedVideo] = useState(null); // State to store recorded video
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      // Get access to the user's front camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // "user" for front camera
        audio: true,
      });

      streamRef.current = stream; // Store the stream reference

      // Set up the video element to preview the stream
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      // Create a MediaRecorder instance to record the stream
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];

      // Collect the video data in chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      // When the recording stops, create a video blob and save it
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideo(videoUrl); // Store the video URL to display it
        stopStream(); // Stop the camera stream after recording
      };

      // Start recording the video
      mediaRecorder.start();

      // Stop recording after 30 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 30000); // 30 seconds
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      // Stop all tracks of the stream
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="main_container_">
      <div>
        <h3 className="fw-bold text-center mb-3">
          How Verification People in Course
        </h3>
        <div className="m-auto w-100 text-center">
          <button className="dark_btn" onClick={startRecording}>
            Start Recording
          </button>
        </div>

        {/* Video preview element */}
        <div className="mt-4 text-center">
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "300px", height: "auto" }}
          ></video>
        </div>

        {/* Show the recorded video after recording is complete */}
        {recordedVideo && (
          <div className="mt-4 text-center">
            <h5>Recorded Video:</h5>
            <video
              src={recordedVideo}
              controls
              style={{ width: "300px", height: "auto" }}
            ></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
