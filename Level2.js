export default class Level2 extends Phaser.Scene{
    constructor() {
        super({key: 'level2'});
    }
    preload(){
        this.load.image("imagen", "sprites/time-out-corner.png")
    }

    init(gameManager){
        this.gameManager = gameManager;
    }

    create(){
        this.imagen = this.add.sprite(550,397,"imagen");
        this.gameManager.AddSubstractMoney(30);
        this.gameManager.Strike(80);
        console.log(this.gameManager.dinero);
        console.log(this.gameManager.strikes);
    }
}