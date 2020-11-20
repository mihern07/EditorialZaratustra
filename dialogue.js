export default class Dialogue extends Phaser.GameObjects.Sprite{
    /** @type {Phaser.GameObjects.Sprite} */
    label

    constructor(scene,x,y, sprite, texto){
        super(scene,x,y, sprite);
        
        this.setScale(2);
        scene.add.existing(this);
        scene.add.text(x-240,y-50,texto);
    }
}