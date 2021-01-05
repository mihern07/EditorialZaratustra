import { penConst,  draggableConst } from "./constants.js";
import Draggable from "./draggable.js";
export default class Pen extends Draggable {
    constructor(scene, x, y, sprite) {
        super(scene,x,y,sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)

        this.firstPosX = this.x;
        this.firstPosY = this.y;

        // this.scene = scene;

        // scene.physics.add.existing(this);
        // this.body.allowGravity = false;

        this.setScale(penConst.scale);

        // scene.add.existing(this);

        // this.setInteractive();
        this.setDepth(penConst.depth);

        this.States = { NORMAL: 0, GREEN: 1, RED: 2 };
        this.actualState = this.States.NORMAL;
        this.hasSigned = false;
    }

    setNormal() {
        this.actualState = this.States.NORMAL; //NORMAL
        this.hasSigned = true;
        this.clearTint();
    }

    setRed() {
        this.actualState = this.States.RED; //ROJO
        this.hasSigned = false;
        this.setTint(penConst.tintRed);  
    }

    setGreen() {
        this.actualState = this.States.GREEN; //VERDE
        this.hasSigned = false;
        this.setTint(penConst.tintGreen);
    }

    isRed(){
        return this.actualState == this.States.RED;
    }

    isGreen(){
        return this.actualState == this.States.GREEN;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}