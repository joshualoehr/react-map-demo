import React from 'react';
import Map from './components/Map';

const getCurrentLocation = () => ([
    48.7451777,
    -122.47007679999999
]);

export default () => (
    <Map position={getCurrentLocation()} />
);

