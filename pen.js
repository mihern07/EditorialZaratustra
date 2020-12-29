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

        // this.PenR = scene.add.sprite(this.x, this.y, sprite2).setInteractive(); //Pluma Roja

        // this.PenV = scene.add.sprite(this.x, this.y, sprite3).setInteractive(); //Pluma Verde

        // this.scene.physics.add.existing(this.PenR);
        // this.PenR.body.allowGravity = false;
        // this.PenR.setDepth(penConst.depth);

        // this.scene.physics.add.existing(this.PenV);
        // this.PenV.body.allowGravity = false;
        // this.PenV.setDepth(penConst.depth);

        // this.PenR.setScale(penConst.scale)
        // this.PenV.setScale(penConst.scale)

        // this.PenR.visible = false;
        // this.PenV.visible = false;

        // this.scene.input.setDraggable(this);
        // this.scene.input.setDraggable(this.PenR);
        // this.scene.input.setDraggable(this.PenV);

        // this.PenR.setDamping = true;
        // this.PenV.setDamping = true;
        // this.setDamping = true;

        // this.on('drag', pointer => {
        //     if ((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()) {
        //         this.x = pointer.x;
        //         this.y = pointer.y;
        //         this.PenV.x = this.x;
        //         this.PenV.y = this.y;
        //         this.PenR.x = this.x;
        //         this.PenR.y = this.y;
        //     }
        // })

        // this.PenV.on('drag', pointer => {
        //     if ((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()) {
        //         this.x = pointer.x;
        //         this.y = pointer.y;
        //         this.PenV.x = this.x;
        //         this.PenV.y = this.y;
        //         this.PenR.x = this.x;
        //         this.PenR.y = this.y;
        //     }
        // })

        // this.PenR.on('drag', pointer => {
        //     if ((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()) {
        //         this.x = pointer.x;
        //         this.y = pointer.y;
        //         this.PenV.x = this.x;
        //         this.PenV.y = this.y;
        //         this.PenR.x = this.x;
        //         this.PenR.y = this.y;
        //     }
        // })

    }

    // preUpdate(){
    //     if(this.drag) this.posUpdater(this);
    // }

    // posUpdater(pointer){
    //     if((pointer.x > this.limitX0 && pointer.x < this.limitXX && pointer.y > this.limitY0 && pointer.y < this.limitYY) && pointer.leftButtonDown()){
    //         this.x = pointer.x;
    //         this.y = pointer.y;
    //         this.PenV.x = this.x;
    //         this.PenV.y = this.y;
    //         this.PenR.x = this.x;
    //         this.PenR.y = this.y;
    //     }
    // }
    // pressed(x)
    // {
    //     this.PenR.on("pointerup", pointer => {
    //         if(this.physics.overlap(this, x)) { //Overlap Documento
    //             this.chara.DenyChar();
    //             console.log("Hay solapeD Deny");

    //       }
    //     })  

    //     this.PenV.on("pointerup", pointer => {
    //         if(this.physics.overlap(this, x)) { //Overlap Documento
    //             this.chara.AcceptChar();
    //             console.log("Hay solapeD Accept");
    //       }
    //     })  
    // }

    setNormal() {
        this.actualState = this.States.NORMAL; //NORMAL
        this.hasSigned = true;
        this.setTintFill(penConst.tintNormal);
    }

    setRed() {
        this.actualState = this.States.RED; //ROJO
        this.hasSigned = false;
        this.setTintFill(penConst.tintRed);
    }

    setGreen() {
        this.actualState = this.States.GREEN; //VERDE
        this.hasSigned = false;
        this.setTintFill(penConst.tintGreen);
    }

    isRed(){
        return this.actualState == this.States.RED;
    }

    isGreen(){
        return this.actualState == this.States.GREEN;
    }

    // changeColor() {
    //     switch (this.States) {
    //         case 0: //Sprite normal
    //             this.visible = true;
    //             this.PenV.visible = false;
    //             this.PenR.visible = false;
    //             break;
    //         case 1: //Sprite verde
    //             this.PenV.visible = true;
    //             this.visible = false;
    //             this.PenR.visible = false;
    //             break;
    //         case 2: //Sprite rojo
    //             this.PenR.visible = true;
    //             this.visible = false;
    //             this.PenV.visible = false;
    //             break;
    //     }
    // }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        // this.PenV.x = this.x;
        // this.PenV.y = this.y;
        // this.PenR.x = this.x;
        // this.PenR.y = this.y;
    }
}