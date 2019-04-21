import L from 'leaflet';
import { withLeaflet, MapControl } from 'react-leaflet';

L.Control.Draw = L.Control.extend({
    onAdd: map => {
        const div = L.DomUtil.create('div');
        div.classList.add('draw-control');
        div.drawing = false;

        const img = L.DomUtil.create('img');
        img.srcs = ['pencil-edit-button.svg', 'cancel.svg'];
        img.src = img.srcs[0];
        
        div.append(img);
        L.DomEvent.on(div, 'click', () => {
            div.drawing = !div.drawing;
            img.src = img.srcs[div.drawing ? 1 : 0];
        });

        return div;
    }
});

class DrawControl extends MapControl {
    createLeafletElement(props) {
        return new L.Control.Draw(props);
    }
}

export default withLeaflet(DrawControl);