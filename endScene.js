import { endConst } from "./constants.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene' });
    }

    create() {
        //Creamos el background
        this.background = this.add.sprite(endConst.backgroundPosX, endConst.backgroundPosY, "street");
        this.background.setInteractive();

        //Creamos el cuadro negro de texto
        this.fondo = this.add.sprite(endConst.backgroundPosX, endConst.backgroundPosY, "fondo");
        this.fondo.setScale(endConst.backgroundScaleX, endConst.backgroundScaleY);

        //Creamos el botón 1
        this.button1 = this.add.sprite(endConst.button1PosX, endConst.buttonPosY, "buttonNotPressed").setInteractive();
        this.button1.setScale(1.5);
        this.button1.visible = false;

        //Creamos el botón 2
        this.button2 = this.add.sprite(endConst.button2PosX, endConst.buttonPosY, "buttonNotPressed").setInteractive();
        this.button2.setScale(1.5);
        this.button2.visible = false;

        //Creamos el texto del botón 1
        this.buttonText1 = this.add.text(endConst.buttonText1PosX, endConst.buttonTextPosY, "No Espiar", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.buttonText1.setFontSize(endConst.buttonTextSize);
        this.buttonText1.visible = false;

        //Creamos el texto del botón 2
        this.buttonText2 = this.add.text(endConst.buttonText2PosX, endConst.buttonTextPosY, "Espiar", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.buttonText2.setFontSize(endConst.buttonTextSize);
        this.buttonText2.visible = false;

        this.buttonpressed = false;

        //Establecemos el texto
        this.dialogoAPartir = this.cache.text.get("introEnd");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 3;
        this.text = this.dialogoAPartir.slice(this.i, this.j);
        this.i = this.i + 3;
        this.j = this.j + 3;

        this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);

        //Si el background es pulsado...
        this.background.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                //Dividimos el texto
                this.text = this.dialogoAPartir.slice(this.i, this.j);
                //Si no queda más texto...
                if (this.text.length == 0) {
                    if (this.buttonpressed)
                        //Cambiamos de escena
                        this.scene.switch("creditsScene");
                    else {
                        //Hacemos visibles los botones y sus textos
                        this.button1.visible = true;
                        this.button2.visible = true;
                        this.buttonText1.visible = true;
                        this.buttonText2.visible = true;
                    }
                }
                else {
                    //Destruimos texto y añadimos el siguiente
                    this.showText.destroy();
                    this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);
                    this.i = this.i + 3;
                    this.j = this.j + 3;
                }
            }
        });

        //Si el botón 1 es pulsado...
        this.button1.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.changeText("end1");

                this.changeSprite();

                this.buttonpressed = true;
            }
        })

        //Si el botón 2 es pulsado...
        this.button2.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.changeText("end2");

                this.changeSprite();

                this.buttonpressed = true;
            }
        })
    }

    //Cambiamos el texto
    changeText(txt) {
        this.dialogoAPartir = this.cache.text.get(txt);
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 3;

        this.text = this.dialogoAPartir.slice(this.i, this.j);
        this.showText.destroy();
        this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);
        this.i = this.i + 3;
        this.j = this.j + 3;
    }

    //Cambiamos la visibilidad de los sprites
    changeSprite() {
        this.button1.visible = !this.button1.visible;
        this.button2.visible = !this.button2.visible;
        this.buttonText1.visible = !this.buttonText1.visible;
        this.buttonText2.visible = !this.buttonText2.visible;
    }
}