import {victoryConst} from "./constants.js";

export default class VictoryScene extends Phaser.Scene{
    constructor() {
        super({key: 'victoryScene'});
    }
    preload(){
        this.load.image("pesetas", "sprites/pesetas.jpg");
        this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");
    }
    init(gameManager){
        this.gameManager = gameManager;
    }
    create(){
        this.background = this.add.sprite(victoryConst.bgPosX,victoryConst.bgPosY,"pesetas");
        this.background.setScale(victoryConst.bgScale);
        this.congratulation = this.add.text(victoryConst.congratPosX, victoryConst.congratPosY, "¡Buen trabajo!");
        this.congratulation.setFontSize(victoryConst.congSize);
        this.puntuacion = this.add.text(victoryConst.puntPosX, victoryConst.puntPosY, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setFontSize(victoryConst.puntSize);
        this.strikes = this.add.text(victoryConst.strikesPosX, victoryConst.strikesPosY, this.gameManager.strikes + "/3 strikes recibidos");
        this.strikes.setFontSize(victoryConst.strikeSize);

        this.button = this.add.sprite(victoryConst.buttonPosX, victoryConst.buttonPosY, "buttonNotPressed");
        this.button.setInteractive();
        this.button.setScale(victoryConst.buttonScale);
        this.buttonText = this.add.text(victoryConst.buttonTextPosX, victoryConst.buttonTextPosY, "Volver al menú");
        this.buttonText.setFontSize(victoryConst.buttonTextSize);

        this.button.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.start('titleScene');
            }
        })
    }
}