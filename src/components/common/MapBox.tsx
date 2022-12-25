import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";
import { IAccountLocation } from "../../models/account";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapBoxProps {
    isChanged?: boolean;
    location: IAccountLocation;
    darggable?: boolean;
    handler?: (geoLocation: IAccountLocation) => void;
}

const MapBox = ({ isChanged, location, darggable = false, handler }: MapBoxProps) => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(location.longitude);
    const [lat, setLat] = useState(location.latitude);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        setLng(location.longitude);
        setLat(location.latitude);
    }, [location]);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [Number(lng.toFixed(2)), Number(lat.toFixed(2))],
            zoom: zoom,
        });

        const marker = new mapboxgl.Marker({
            // color: "#FFFFFF",
            draggable: darggable,
        })
            .setLngLat([lng, lat])
            .addTo(map.current);

        marker.on("dragend", function (e) {
            var lngLat = marker.getLngLat();

            handler && handler({ latitude: lngLat["lat"], longitude: lngLat["lng"] });
        });
    }, [lng, lng, location]);

    useEffect(() => {
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
