export default class VictoryScene extends Phaser.Scene{
    constructor() {
        super({key: 'victoryScene'});
    }
    init(gameManager){
        this.gameManager = gameManager;
    }
    create(){
        this.congratulation = this.add.text(350, 200, "¡Buen trabajo!")
        this.congratulation.setScale(3);
        this.puntuacion = this.add.text(400, 300, this.gameManager.dinero + "€/" + this.gameManager.objetivo + "€ conseguidos");
        this.puntuacion.setScale(2);
        this.strikes = this.add.text(370, 400, this.gameManager.strikes + "/3 strikes recibidos");
        this.strikes.setScale(2);
    }
}