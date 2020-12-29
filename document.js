import {documentConst, draggableConst} from "./constants.js";
import Draggable from "./draggable.js";

export default class Document extends Draggable{
    constructor(scene,x,y,sprite)
    {
        //Constructora Drag
        super(scene,x,y,sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        // this.scene = scene;
        this.setScale(documentConst.scale);
        
        this.setDepth(documentConst.depth);

        // scene.physics.add.existing(this);
        // this.body.allowGravity = false;
        
        // scene.add.existing(this);
        
        // this.setInteractive();
        
        //this.scene.input.setDraggable(this.Libro2);
        // scene.input.setDraggable(this);

        this.setDamping = true;
        
        // this.on('drag', pointer=> {
        //     if((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()){
        //         this.x = pointer.x;
        //         this.y = pointer.y;
        //     }
            
        //     // if(pointer.leftButtonDown()){
        //     //     this.x = pointer.x;
        //     //     this.y = pointer.y;
        //     // }
        // })
    }

    resetPos(){
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}