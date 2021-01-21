import { bookConst } from "./constants.js";
import { draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class Book extends Draggable {
    constructor(scene, x, y, sprite, sprite2, genre, category, numPags) {
        super(scene, x, y, sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.visible = false;


        this.setScale(bookConst.scale);
        this.setDepth(bookConst.depth);

        this.pageSound = this.scene.sound.add("pageSound");

        //Sprite ibro abierto
        this.libro2 = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.libro2.setScale(bookConst.openedScale);
        this.libro2.visible = false;

        this.libro2.x = this.scene.game.config.width / 2;
        this.libro2.y = this.scene.game.config.height / 2;
        this.libro2.setDepth(bookConst.openedDepth);

        this.info = [scene.add.text(this.x + bookConst.offsetX, this.y + bookConst.firstOffsetY, genre, { fontFamily: 'Lobster' }).setStroke('#000000', 4),
        scene.add.text(this.x + bookConst.offsetX, this.y + bookConst.secondOffsetY, category, { fontFamily: 'Lobster' }).setStroke('#000000', 4),
        scene.add.text(this.x + bookConst.offsetX, this.y + bookConst.thirdOffsetY, numPags + " pags", { fontFamily: 'Lobster' }).setStroke('#000000', 4)]; //Añadimos texto

        // Propiedades del texto
        for (let i = 0; i < this.info.length; i++) {
            this.info[i].visible = false;
            this.info[i].setFontSize(bookConst.textScale);
            this.info[i].setDepth(bookConst.openedDepth);
        }

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            this.switchSprite(pointer);
        })

        this.libro2.on("pointerdown", pointer => {
            this.switchSprite(pointer);
        })
    }

    switchSprite(pointer) {
        if (pointer.rightButtonDown()) {
            this.pageSound.play();
            this.changeSprites();
            for (let i = 0; i < this.info.length; i++) {
                this.info[i].visible = !this.info[i].visible;
            }
        }
    }
    changeSprites() {
        this.visible = !this.visible;
        this.libro2.visible = !this.libro2.visible;
    }

    cerrarSprites() {
        this.visible = false;
        this.libro2.visible = false;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.libro2.x = this.firstPosX;
        this.libro2.y = this.firstPosY;
    }
}