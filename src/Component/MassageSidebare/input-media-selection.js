
const AudioInput = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [audioStream, setAudioStream] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
                setDevices(audioInputDevices);
                if (audioInputDevices.length > 0) {
                    setSelectedDeviceId(audioInputDevices[0].deviceId);
                }
            })
            .catch(err => console.error('Error enumerating devices: ', err));
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            const constraints = {
                audio: {
                    deviceId: { exact: selectedDeviceId }
                },
                video: false
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    setAudioStream(stream);
                })
                .catch(err => console.error('Error accessing media devices: ', err));
        }
    }, [selectedDeviceId]);

    return (
        <div className="p-4">
            <div className="mb-4">
                <label htmlFor="microphoneSelect" className="block text-sm font-medium text-gray-700">Select Microphone:</label>
                <select
                    id="microphoneSelect"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                    value={selectedDeviceId}>
                    {devices.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Microphone ${devices.indexOf(device) + 1}`}
                        </option>
                    ))}
                </select>
            </div>
            <audio id="audioElement" autoPlay controls srcObject={audioStream}></audio>
        </div>
    );
};

export default AudioInput;