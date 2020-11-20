export default class Dialogue extends Phaser.GameObjects.Sprite{
    /** @type {Phaser.GameObjects.Sprite} */
    label

    /** @type {Phaser.GameObjects.text} */
    texto

    constructor(scene,x,y, sprite, texto){
        super(scene,x,y, sprite);
        scene.add.existing(this);
    
        
        this.texto=scene.add.text(x-120,y,texto, {color: 0x0A0A0A});
        this.texto.setScale(.7);
    }
}