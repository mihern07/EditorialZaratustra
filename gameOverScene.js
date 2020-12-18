export default class GameOverScene extends Phaser.Scene{
    constructor() {
        super({key: 'gameOverScene'});
    }
    init(gameManager){
        this.gameManager = gameManager;
    }
    create(){
        this.congratulation = this.add.text(200, 200, "¡Oh no! Inténtalo otra vez")
        this.congratulation.setScale(3);
        this.puntuacion = this.add.text(400, 300, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setScale(2);
        this.strikes = this.add.text(370, 400, this.gameManager.strikes + "/3 strikes recibidos");
        this.strikes.setScale(2);
    }
}