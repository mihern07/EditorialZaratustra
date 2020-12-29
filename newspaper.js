import { newsConst } from "./constants.js";
export default class Newspaper extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, sprite2, day, month, year, news) {
        super(scene, x, y, sprite)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;

        this.visible = true;


        this.setScale(newsConst.scale);
        this.setDepth(newsConst.depth);
        //Lo añade a la escena
        scene.add.existing(this);

        //Permite interactuar con él
        this.setInteractive({ draggable: true, dropZone: true });

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
        scene.add.text(this.x + newsConst.offsetX, this.y + newsConst.secondOffsetY, news, { color: 0x0A0A0A })]; //Añadimos texto. (cambiar numeros por globales)

        for (let i = 0; i < this.info.length; i++) {
            this.info[i].visible = false;
            this.info[i].setDepth(newsConst.openedDepth);
        }

        //Configuración del Drag        
        //this.bound = new Phaser.Geom.Rectangle(100, 100, 500, 400);
        //this.body.setBoundsRectangle(this.bound);

        this.on('drag', pointer => {
            if ((pointer.x > 50
                && pointer.y > 450
                && pointer.y < 900
                && pointer.x < 1040)
                && pointer.leftButtonDown()) {

                this.x = pointer.x;
                this.y = pointer.y;

            }
        })

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            //hacer algo.
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
            //hacer algo.
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