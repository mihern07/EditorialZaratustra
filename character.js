let xPos;

export default class Character extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y, sprite){
        super(scene,x,y, sprite);

        this.scene=scene;
        this.setScale(.5);
        scene.add.existing(this);
        this.xPos = x;
    }

    Move() {
        this.xPos -= 5;
    }
}