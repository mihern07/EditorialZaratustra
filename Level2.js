export default class Level2 extends Phaser.Scene{
    constructor() {
        super({key: 'Level2'});
    }
    preload(){
        this.load.image("imagen", "sprites/time-out-corner.png")
    }
    create(){
        this.imagen = this.add.sprite(550,397,"imagen");
    }
}