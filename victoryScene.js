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
        this.background = this.add.sprite(550,400,"pesetas");
        this.background.setScale(1.1);
        this.congratulation = this.add.text(350, 200, "¡Buen trabajo!");
        this.congratulation.setFontSize(50);
        this.puntuacion = this.add.text(325, 300, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setFontSize(40);
        this.strikes = this.add.text(315, 400, this.gameManager.strikes + "/3 strikes recibidos");
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