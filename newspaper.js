import { newsConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class Newspaper extends Draggable {
    constructor(scene, x, y, sprite, sprite2, day, month, year, news) {
        super(scene,x,y,sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.visible = true;


        this.setScale(newsConst.scale);
        this.setDepth(newsConst.depth);
        
        //Sprite periódico abierto
        this.bigNews = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.bigNews.setScale(newsConst.openedScale);
        this.bigNews.visible = false;

        this.bigNews.x = this.scene.game.config.width / 2;
        this.bigNews.y = this.scene.game.config.height / 2;
        this.bigNews.setDepth(newsConst.openedDepth);

        this.day = day;
        this.month = month;
        this.year = year;
        this.info = [scene.add.text(this.x + newsConst.offsetX, this.y + newsConst.firstOffsetY, this.day + "/" + this.month + "/" + this.year, { color: 0x0A0A0A }),
        scene.add.text(this.x + newsConst.offsetX, this.y + newsConst.secondOffsetY, news, { color: 0x0A0A0A })];

        for (let i = 0; i < this.info.length; i++) {
            this.info[i].visible = false;
            this.info[i].setDepth(newsConst.openedDepth);
        }

        this.on("pointerdown", pointer => {
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.visible = !this.visible;
                this.bigNews.visible = !this.bigNews.visible;

                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })

        this.bigNews.on("pointerdown", pointer => {
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.visible = !this.visible;
                this.bigNews.visible = !this.bigNews.visible;
                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })
    }
    cerrarSprites() {
        this.visible = false;
        this.bigNews.visible = false;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.bigNews.x = this.firstPosX;
        this.bigNews.y = this.firstPosY;
    }
}