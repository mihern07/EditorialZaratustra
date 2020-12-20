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
        this.background = this.add.sprite(550,400,"street");
        this.congratulation = this.add.text(200, 200, "¡Oh no! Inténtalo otra vez")
        this.congratulation.setTint(0xE31B1B);
        this.congratulation.setFontSize(50);
        this.puntuacion = this.add.text(325, 300, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setTint(0xE31B1B);
        this.puntuacion.setFontSize(40);
        this.strikes = this.add.text(315, 400, this.gameManager.strikes + "/"+ this.gameManager.numMaxStrikes + " strikes recibidos");
        this.strikes.setTint(0xE31B1B);
        this.strikes.setFontSize(40);
        this.button = this.add.sprite(550, 600, "buttonNotPressed");
        this.button.setInteractive();
        this.button.setScale(2);
        this.buttonText = this.add.text(420, 585, "Volver al menú");
        this.buttonText.setFontSize(30);

        this.button.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.start('titleScene');
            }
        })
    }
}