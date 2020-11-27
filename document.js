export default class Document extends Phaser.GameObjects.Sprite{

    /** @type {Phaser.Scene} */
    scene

    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite)
        
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;
        this.setScale(.3);
        
        scene.add.existing(this);
        
        this.setInteractive();
        
        //this.scene.input.setDraggable(this.Libro2);
        this.scene.input.setDraggable(this);

        this.setDamping = true;
        
        this.on('drag', pointer=> {
            if(pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
            }
        })
    }

    resetPos(){
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}