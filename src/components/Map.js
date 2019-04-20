import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

export default class Map extends React.Component {
    render() {
        const { position } = this.props;
        return (
            <LeafletMap center={position} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LeafletMap>
        );
    }
};