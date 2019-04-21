import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const icon = L.divIcon({
    className: 'location-marker',
    iconSize: null
});

export default ({ position }) => (
    <Marker position={position} icon={icon} />
);
