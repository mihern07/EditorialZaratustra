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
        this.setDepth(1);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        
        scene.add.existing(this);
        
        this.setInteractive();
        
        //this.scene.input.setDraggable(this.Libro2);
        this.scene.input.setDraggable(this);
        this.visible=false;

        this.setDamping = true;
        
        this.on('drag', pointer=> {
            if((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
            }
            
            // if(pointer.leftButtonDown()){
            //     this.x = pointer.x;
            //     this.y = pointer.y;
            // }
        })
    }

    resetPos(){
        this.x = this.firstPosX;
        this.y = this.firstPosY;
    }
}