import L from 'leaflet';
import { withLeaflet, MapControl } from 'react-leaflet';

L.Control.Draw = L.Control.extend({
    getDiv() {
        if (!this.div) {
            this.div = L.DomUtil.create('div');
            this.div.classList.add('draw-control');
            this.div.drawing = false;
            this.div.append(this.getImg());
        }
        return this.div;
    },
    getImg() {
        if (!this.img) {
            this.img = L.DomUtil.create('img');
            this.img.srcs = ['pencil-edit-button.svg', 'cancel.svg'];
            this.img.src = this.img.srcs[0];
        }
        return this.img;
    },
    onAdd(map) {
        return this.getDiv();
    }
});

class DrawControl extends MapControl {

    constructor(props) {
        super(props);

        const div = this.leafletElement.getDiv();
        const img = this.leafletElement.getImg();
        L.DomEvent.on(div, 'click', () => this.toggleDrawing(div, img));
    }

    createLeafletElement(props) {
        return new L.Control.Draw(props);
    }

    toggleDrawing = (div, img) => {
        div.drawing = !div.drawing;
        img.src = img.srcs[div.drawing ? 1 : 0];
        this.props.onClick(div.drawing);
    }
}

export default withLeaflet(DrawControl);