import { postItConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class PostIt extends Draggable {

    constructor(scene, x, y, sprite, text) {
        super(scene, x, y, sprite, draggableConst.boardX0, draggableConst.boardXX, draggableConst.boardY0, draggableConst.boardYY);

        // this.scene.add.existing(this);
        // // Se puede arrastrar
        // this.setInteractive({ draggable: true, dropZone: true });

        this.info = scene.add.text(x + postItConst.offsetX, y + postItConst.offsetY, text, { color: 0x0A0A0A }); //Añadimos texto.
        this.info.setScale(postItConst.scale);
        //Arrastrar con cualquiera de los clicks
        //Se determina la region exacta por la que se puede arrastrar el PostIt
        this.on('drag', pointer => {
            if ((pointer.x > 890
                && pointer.x > 890 + (this.y - 400)
                && pointer.y > 85 && pointer.x < 1040
                && pointer.y < 400 + (this.x - 890))
                && (pointer.leftButtonDown() || pointer.rightButtonDown())) {
                this.x = pointer.x;
                this.y = pointer.y;
                this.info.y = this.y + postItConst.offsetY;
                this.info.x = this.x + postItConst.offsetX;
            }
        })

    }

}