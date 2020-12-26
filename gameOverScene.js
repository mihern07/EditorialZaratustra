import {gameOverConst} from "./constants.js";

export default class GameOverScene extends Phaser.Scene{
    constructor() {
        super({key: 'gameOverScene'});
    }
    preload(){
        this.load.image("street", "sprites/street.jpg");
        this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");
    }
    init(gameManager){
        this.gameManager = gameManager;
    }
    create(){
        this.background = this.add.sprite(gameOverConst.bgPosX,gameOverConst.bgPosY,"street");
        this.congratulation = this.add.text(gameOverConst.congratPosX, gameOverConst.congratPosY, "¡Oh no! Inténtalo otra vez")
        this.congratulation.setTint(gameOverConst.congratTint );
        this.congratulation.setFontSize(gameOverConst.congSize);
        this.puntuacion = this.add.text(gameOverConst.puntPosX, gameOverConst.puntPosY, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setTint(gameOverConst.puntTint);
        this.puntuacion.setFontSize(gameOverConst.puntSize);
        this.strikes = this.add.text(gameOverConst.strikesPosX, gameOverConst.strikesPosY, this.gameManager.strikes + "/"+ this.gameManager.numMaxStrikes + " strikes recibidos");
        this.strikes.setTint(gameOverConst.strikeTint);
        this.strikes.setFontSize(gameOverConst.strikeSize);
        this.button = this.add.sprite(gameOverConst.buttonPosX, gameOverConst.buttonPosY, "buttonNotPressed");
        this.button.setInteractive();
        this.button.setScale(gameOverConst.buttonScale);
        this.buttonText = this.add.text(gameOverConst.buttonTextPosX, gameOverConst.buttonTextPosY, "Volver al menú");
        this.buttonText.setFontSize(gameOverConst.buttonTextSize);

        this.button.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.start('titleScene');
            }
        })
    }
}