import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapBoxProps {
    isChanged?: boolean;
    location: { longitude: number; latitude: number };
    darggable?: boolean;
}

const MapBox = ({ isChanged, location, darggable = false }: MapBoxProps) => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-74.0632);
    const [lat, setLat] = useState(40.7346);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        new mapboxgl.Marker({
            // color: "#FFFFFF",
            draggable: darggable,
        })
            .setLngLat([lng, lat])
            .addTo(map.current);
    }, [lng, lng]);

    useEffect(() => {
        setLng(location.longitude);
        setLat(location.latitude);

        if (map.current && isChanged) {
            map.current.resize();
        }
    }, [isChanged]);

    return (
        <Box
            className="haji"
            mt={1.5}
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "10px",
            }}
        >
            <div id="mapid" ref={mapContainer} className="map-container" style={{ width: "100%", height: "100%" }} />
        </Box>
    );
};

export default MapBox;
