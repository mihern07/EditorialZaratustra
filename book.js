import { bookConst } from "./constants.js";
import { draggableConst} from "./constants.js";
import Draggable from "./draggable.js";

export default class Book extends Draggable {
    constructor(scene, x, y, sprite, sprite2, genre, category, numPags) {
        super(scene,x,y,sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        // this.scene = scene;

        this.visible = false;


        this.setScale(bookConst.scale);
        this.setDepth(bookConst.depth);

        //Lo añade a la escena
        // scene.add.existing(this);
        
        //Permite interactuar con él
        // this.setInteractive({ draggable: true, dropZone: true });
        // scene.input.setDraggable(this);
        //Sprite ibro abierto
        this.Libro2 = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.Libro2.setScale(bookConst.openedScale);
        this.Libro2.visible = false;

        this.Libro2.x = this.scene.game.config.width / 2;
        this.Libro2.y = this.scene.game.config.height / 2;
        this.Libro2.setDepth(bookConst.openedDepth);

        this.info = [scene.add.text(this.x - bookConst.offsetX, this.y - bookConst.firstOffsetY, genre, { color: 0x0A0A0A }),
        scene.add.text(this.x - bookConst.offsetX, this.y - bookConst.secondOffsetY, category, { color: 0x0A0A0A }),
        scene.add.text(this.x - bookConst.offsetX, this.y - bookConst.thirdOffsetY, numPags + " pags", { color: 0x0A0A0A })]; //Añadimos texto. (cambiar numeros por globales)

        for (let i = 0; i < this.info.length; i++) {
            this.info[i].visible = false;
            this.info[i].setDepth(bookConst.openedDepth);
        }

        //Configuración del Drag        
        //this.bound = new Phaser.Geom.Rectangle(100, 100, 500, 400);
        //this.body.setBoundsRectangle(this.bound);

        // this.on('drag', pointer => {
        //     if ((pointer.x > 50
        //         && pointer.y > 450
        //         && pointer.y < 900
        //         && pointer.x < 1040)
        //         && pointer.leftButtonDown()) {

        //         this.x = pointer.x;
        //         this.y = pointer.y;

        //     }
        // })

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.changeSprites();

                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })

        this.Libro2.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.changeSprites();
                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })
    }

    changeSprites() {
        this.visible = !this.visible;
        this.Libro2.visible = !this.Libro2.visible;
    }

    cerrarSprites() {
        this.visible = false;
        this.Libro2.visible = false;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.Libro2.x = this.firstPosX;
        this.Libro2.y = this.firstPosY;
    }
}