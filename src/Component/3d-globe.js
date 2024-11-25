import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function EarthGlobe() {
    const globeEl = useRef();
    const [polygonsArea, setPolygonsArea] = useState(null);

    useEffect(() => {
        fetch('/world-mappig.geojson').then(res => res.json()).then(setPolygonsArea);

        let animationFrameId;
        const animate = () => {
            if (globeEl.current) {
                const currentPov = globeEl.current.pointOfView();
                globeEl.current.pointOfView({ lng: currentPov.lng - 0.1 });
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <aside className="absolute top-[4%] right-[-20%] pointer-events-none overflow-hidden">
        {polygonsArea ? <Globe
            ref={globeEl}
            width={1200}
            height={1200}
            globeImageUrl="/images/lightgray-material.png"
            backgroundColor="rgba(0, 0, 0, 0)"
            hexPolygonsData={polygonsArea.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.3}
            hexPolygonUseDots={true}
            hexPolygonColor={() => '#64748b'}
            showAtmosphere={false}
            objectRotation={[100, 200]}
            controlsOptions={{
                enableZoom: false,
                zoomSpeed: 0,
            }}
            pointOfView={{ altitude: 0.5 }}
        /> : null}
    </aside>
}
