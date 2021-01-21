import { documentConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class Document extends Draggable {
    constructor(scene, x, y, sprite) {
        //Constructora Drag
        super(scene, x, y, sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)

        this.firstPosX = this.x;
        this.firstPosY = this.y;

        // this.scene = scene;
        this.setScale(documentConst.scale);

        this.setDepth(documentConst.depth);

        this.setDamping = true;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}