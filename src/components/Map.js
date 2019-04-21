import React from 'react';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import CurrentLocationMarker from './CurrentLocationMarker';
import DrawControl from './DrawControl';
import { randNorm } from '../util';

const NUM_MARKERS = 20;
const OFFSETS = Array.from(Array(NUM_MARKERS), () => randNorm(0, 0.005));

export default ({ position }) => {
    let markerPositions = !position ? [] : OFFSETS.map(offset => position.map((pos, i) => pos + offset[i]));
    return (
        <LeafletMap center={position} zoom={15}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawControl position="topright" />
            <CurrentLocationMarker position={position} />
            {markerPositions.map(([lat, lng], idx) => (
                <Marker key={`marker${idx}`} position={[lat, lng]} />
            ))}
        </LeafletMap>
    );
};