import React from 'react';
import { Map as LeafletMap, Marker, Polygon, Polyline, TileLayer } from 'react-leaflet';
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
            polyline: [],
            polygon: []
        }
    }

    setDrawingEnabled = (drawingEnabled) => {
        if (drawingEnabled) {
            this.clear();
        }
        this.setState({ drawingEnabled });
    }

    setDrawingActive = (drawingActive) => {
        if (drawingActive) {
            this.clear();
        } else {
            this.select();
        }
        this.setState({ drawingActive });
    }

    draw = (position) => {
        this.setState((state) => ({ polyline: state.polyline.concat(position) }));
    }

    select = () => {
        this.setState({ polygon: this.state.polyline })
    }

    clear = () => {
        this.setState({ polyline: [], polygon: [] });
    }

    render() {
        const { position } = this.props;
        const { drawingActive, drawingEnabled, polygon, polyline } = this.state;
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
                <Polyline color="blue" positions={polyline} />
                <Polygon color="blue" positions={polygon} />
            </LeafletMap>
        );
    }
}