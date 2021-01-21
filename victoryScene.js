import { victoryConst } from "./constants.js";

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'victoryScene' });
    }

    init(data) {
        //Info tomada del nivel actual
        this.gameManager = data.gameManager;
        this.levelManager = data.levelManager;
    }
    create() {
        this.background = this.add.sprite(victoryConst.bgPosX, victoryConst.bgPosY, "pesetas");
        this.background.setScale(victoryConst.bgScale);

        this.fondo = this.add.sprite(victoryConst.blackBoxPosX, victoryConst.blackBoxPosY, "fondo");
        this.fondo.setScale(victoryConst.blackBoxScaleX, victoryConst.blackBoxScaleY);

        this.congratulation = this.add.text(victoryConst.congratPosX, victoryConst.congratPosY, "¡Buen trabajo!", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.congratulation.setFontSize(victoryConst.congSize);
        
        this.puntuacion = this.add.text(victoryConst.puntPosX, victoryConst.puntPosY, this.gameManager.dinero + "/" + this.gameManager.objetivo + " ptas. conseguidas", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.puntuacion.setTint(victoryConst.puntTint);
        this.puntuacion.setFontSize(victoryConst.puntSize);
        
        this.strikes = this.add.text(victoryConst.strikesPosX, victoryConst.strikesPosY, this.gameManager.strikes + "/" + this.gameManager.numMaxStrikes + " strikes recibidos", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.strikes.setTint(victoryConst.strikeTint);
        this.strikes.setFontSize(victoryConst.strikeSize);

        this.button = this.add.sprite(victoryConst.buttonPosX, victoryConst.buttonPosY, "buttonNotPressed");
        this.button.setInteractive();
        this.button.setScale(victoryConst.buttonScale);

        this.buttonText = this.add.text(victoryConst.buttonTextPosX, victoryConst.buttonTextPosY, "Siguiente nivel", { fontFamily: 'Yeon Sung' });
        this.buttonText.setFontSize(victoryConst.buttonTextSize);

        this.button.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.sleep();
                this.levelManager.nextLevel();
            }
        })
    }
}