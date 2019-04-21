import L from 'leaflet';
import { withLeaflet, MapControl } from 'react-leaflet';

L.Control.Watermark = L.Control.extend({
    onAdd: map => {
        const div = L.DomUtil.create('div');
        div.classList.add('draw-control');

        const img = L.DomUtil.create('img');
        img.src = 'pencil-edit-button.svg';
        
        div.append(img);
        return div;
    },
    onRemove: map => {

    }
});

class DrawControl extends MapControl {
    createLeafletElement(props) {
        return new L.Control.Watermark(props);
    }
}

export default withLeaflet(DrawControl);