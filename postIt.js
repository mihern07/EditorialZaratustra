import { postItConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class PostIt extends Draggable {

    constructor(scene, x, y, sprite, text) {
        super(scene, x, y, sprite, draggableConst.boardX0, draggableConst.boardXX, draggableConst.boardY0, draggableConst.boardYY);

        //Info de categoría
        this.info = scene.add.text(x + postItConst.offsetX, y + postItConst.offsetY, text, { fontFamily: 'Lobster', color: 0x0A0A0A }); //Añadimos texto.
        this.info.setScale(postItConst.scale);
        //Arrastrar con cualquiera de los clicks
        //Se determina la region exacta por la que se puede arrastrar el PostIt
        this.on('drag', pointer => {
            if ((pointer.x > postItConst.firstLimitX
                && pointer.x > postItConst.firstLimitX + (this.y - postItConst.limitY)
                && pointer.y > postItConst.firstLimitY && pointer.x < postItConst.limitX
                && pointer.y < postItConst.limitY + (this.x - postItConst.firstLimitX))
                && (pointer.leftButtonDown() || pointer.rightButtonDown())) {
                this.x = pointer.x;
                this.y = pointer.y;
                this.info.y = this.y + postItConst.offsetY;
                this.info.x = this.x + postItConst.offsetX;
            }
        })
    }
}