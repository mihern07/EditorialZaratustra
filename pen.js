import { penConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";
export default class Pen extends Draggable {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)

        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.setScale(penConst.scale);

        this.setDepth(penConst.depth);

        this.states = { NORMAL: 0, GREEN: 1, RED: 2 };
        this.actualState = this.states.NORMAL;
        this.hasSigned = false;
    }

    setNormal() {
        this.actualState = this.states.NORMAL; //NORMAL
        this.hasSigned = true;
        this.clearTint();
    }

    setRed() {
        this.actualState = this.states.RED; //ROJO
        this.hasSigned = false;
        this.setTint(penConst.tintRed);
    }

    setGreen() {
        this.actualState = this.states.GREEN; //VERDE
        this.hasSigned = false;
        this.setTint(penConst.tintGreen);
    }

    isRed() {
        return this.actualState == this.states.RED;
    }

    isGreen() {
        return this.actualState == this.states.GREEN;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}