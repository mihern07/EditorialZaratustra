export default class Character extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y, sprite){

        super(scene,x,y, sprite);

        this.firstPosX = this.x;
        this.setScale(.5);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.hasStopped = false;
    }

    quetepares(){
        this.body.setVelocityX(0);
    }
    quetemuevas(){
        this.body.setVelocityX(-190);
    }

    preUpdate(){

        if(!this.hasStopped && this.x < 540){
            this.quetepares();
            this.hasStopped = true;
        }
        if (this.x < 120){
            this.quetepares();
            this.x = this.firstPosX;
            this.hasStopped = false;
        }
    }

}