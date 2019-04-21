import React, { useState, useEffect } from 'react';
import Map from './components/Map';

const PageLoadMask = ({ loading }) => (
    <div style={{ width: '100%', height: '98vh', display: loading ? 'flex' : 'none' }}>
        <img src='loader.gif' alt='loading...' width={200} height={200} style={{ margin: 'auto' }} />
    </div>
);

export default () => {
    const [fetching, setFetching] = useState(false);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!position && !fetching) {
            setFetching(true);
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setPosition([latitude, longitude]);
                setFetching(false);
            }, console.error, {
                useHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        }
    });

    const loading = !position;
    return (
        <div>
            <PageLoadMask loading={loading} />
            <Map position={position} style={{ display: loading ? 'none' : 'block' }} />
        </div>
    );
};

