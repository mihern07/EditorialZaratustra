import { gameOverConst } from "./constants.js";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOverScene' });
    }

    init(data) {
        this.gameManager = data.gameManager;
        this.levelManager = data.levelManager;
    }
    create() {
        //Creamos el background
        this.background = this.add.sprite(gameOverConst.bgPosX, gameOverConst.bgPosY, "street");

        //Creamos el cuadro negro de texto
        this.fondo = this.add.sprite(gameOverConst.blackBoxPosX, gameOverConst.blackBoxPosY, "fondo");
        this.fondo.setScale(gameOverConst.blackBoxScaleX, gameOverConst.blackBoxScaleY);

        //Creamos el texto de derrota
        this.congratulation = this.add.text(gameOverConst.congratPosX, gameOverConst.congratPosY, "¡Oh no! Inténtalo otra vez", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.congratulation.setTint(gameOverConst.congratTint);
        this.congratulation.setFontSize(gameOverConst.congSize);

        //Creamos el texto de la puntuación
        this.puntuacion = this.add.text(gameOverConst.puntPosX, gameOverConst.puntPosY, this.gameManager.dinero + "/" + this.gameManager.objetivo + " ptas. conseguidas", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.puntuacion.setTint(gameOverConst.puntTint);
        this.puntuacion.setFontSize(gameOverConst.puntSize);

        //Creamos el texto de los strikes
        this.strikes = this.add.text(gameOverConst.strikesPosX, gameOverConst.strikesPosY, this.gameManager.strikes + "/" + this.gameManager.numMaxStrikes + " strikes recibidos", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.strikes.setTint(gameOverConst.strikeTint);
        this.strikes.setFontSize(gameOverConst.strikeSize);

        //Creamos el botón
        this.button = this.add.sprite(gameOverConst.buttonPosX, gameOverConst.buttonPosY, "buttonNotPressed");
        this.button.setInteractive();
        this.button.setScale(gameOverConst.buttonScale);

        //Creamos el texto del botón
        this.buttonText = this.add.text(gameOverConst.buttonTextPosX, gameOverConst.buttonTextPosY, "Continuar", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.buttonText.setFontSize(gameOverConst.buttonTextSize);

        //Si el botón es pulsado...
        this.button.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.sleep();
                //Cargamos de nuevo el nivel actual
                this.levelManager.restartActualLevel();
            }
        })
    }
}