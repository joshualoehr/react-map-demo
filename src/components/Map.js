import React from 'react';
import { Map as LeafletMap, Marker, Polyline, TileLayer } from 'react-leaflet';
import CurrentLocationMarker from './CurrentLocationMarker';
import DrawControl from './DrawControl';
import { randNorm } from '../util';

const NUM_MARKERS = 20;
const OFFSETS = Array.from(Array(NUM_MARKERS), () => randNorm(0, 0.005));

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingEnabled: false,
            drawingActive: false,
            polylinePositions: []
        }
    }

    setDrawingEnabled = (drawingEnabled) => {
        console.log('setDrawingEnabled', drawingEnabled);
        this.setState({ drawingEnabled });
    }

    setDrawingActive = (drawingActive) => {
        console.log('setDrawingActive', drawingActive);
        if (drawingActive)
            this.clear();
        this.setState({ drawingActive });
    }

    draw = (position) => {
        console.log(position);
        this.setState((state) => ({ polylinePositions: state.polylinePositions.concat(position) }));
    }

    clear = () => {
        this.setState({ polylinePositions: [] });
    }

    render() {
        const { position } = this.props;
        const { drawingActive, drawingEnabled, polylinePositions } = this.state;
        let markerPositions = !position ? [] : OFFSETS.map(offset => position.map((pos, i) => pos + offset[i]));
        return (
            <LeafletMap 
                center={position} 
                zoom={15} 
                dragging={!drawingEnabled} 
                onMousedown={(drawingEnabled && !drawingActive) 
                    ? () => this.setDrawingActive(true)
                    : null
                }
                onMousemove={(drawingEnabled && drawingActive)
                    ? ({ latlng }) => this.draw(latlng)
                    : null
                }
                onMouseup={(drawingEnabled && drawingActive)
                    ? () => this.setDrawingActive(false)
                    : null
                }
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DrawControl 
                    position="topright" 
                    
                    
                    onClick={this.setDrawingEnabled}/>
                <CurrentLocationMarker position={position} />
                {markerPositions.map(([lat, lng], idx) => (
                    <Marker key={`marker${idx}`} position={[lat, lng]} />
                ))}
                <Polyline color="blue" positions={polylinePositions} />
            </LeafletMap>
        );
    }
}