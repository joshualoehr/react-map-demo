import React from 'react';
import { Map as LeafletMap, Marker, Polygon, Polyline, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import CurrentLocationMarker from './CurrentLocationMarker';
import DrawControl from './DrawControl';
import { randNorm, polygonContainsPoint } from '../util';

const MARKER_SELECTED = 'marker-icon-red.png';
const MARKER_UNSELECTED = 'marker-icon-blue.png';

const NUM_MARKERS = 20;
const OFFSETS = Array.from(Array(NUM_MARKERS), () => randNorm(0, 0.005));

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingEnabled: false,
            drawingActive: false,
            markers: [],
            polyline: [],
            polygon: [],
            selected: [],
            unselected: []
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
        this.setState(({polyline}) => ({ polyline: polyline.concat(position) }));
    }

    select = () => {
        const unselected = [], selected = [];
        this.state.markers.forEach(marker => {
            if (polygonContainsPoint(marker, this.state.polyline)) {
                selected.push(marker);
            } else {
                unselected.push(marker);
            }
        });
        this.setState({ unselected, selected });
    }

    clear = () => {
        this.setState({ polyline: [], polygon: [], selected: [], unselected: [] });
    }

    componentDidUpdate() {
        const { position } = this.props;
        if (position && this.state.unselected.length === 0) {
            const markers = OFFSETS.map(offset => position.map((pos, i) => pos + offset[i]));
            this.setState({ markers, unselected: markers });
        }
    }

    render() {
        const { position } = this.props;
        const { drawingActive, drawingEnabled, polygon, polyline, selected, unselected } = this.state;
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
                {unselected.map(([lat, long], idx) => (
                    <Marker key={`marker${idx}`} position={[lat, long]} icon={L.icon({ iconUrl: MARKER_UNSELECTED })} />
                ))}
                {selected.map(([lat, long], idx) => (
                    <Marker key={`marker${idx}`} position={[lat, long]} icon={L.icon({ iconUrl: MARKER_SELECTED })} />
                ))}
                <Polyline color="blue" positions={polyline} />
                <Polygon color="blue" positions={polygon} />
            </LeafletMap>
        );
    }
}