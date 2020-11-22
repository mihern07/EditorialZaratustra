export default class Book extends Phaser.GameObjects.Sprite{

    /** @type {Phaser.Scene} */
    scene

        // /** @type {Phaser.GameObjects.Sprite} */
        // Libro

        /** @type {Phaser.GameObjects.Sprite} */
        Libro2

    constructor(scene,x,y,sprite,sprite2)
    {
        super(scene,x,y,sprite)
        
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;
        this.setScale(.3);
        
        scene.add.existing(this);
        
        this.setInteractive();

        this.Libro2 = scene.add.sprite(this.x,this.y,sprite2).setInteractive();
        
        this.Libro2.setScale(.5)
        
        //this.scene.input.setDraggable(this.Libro2);
        this.scene.input.setDraggable(this);

        this.setDamping = true;
        this.Libro2.setDamping = true;

        this.Libro2.visible = false; //visible permite hacer visible o no un sprite.
        
        this.on('drag', pointer=> {
            if(pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.Libro2.x = this.x;
                this.Libro2.y = this.y;
            }
        })

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
          //hacer algo.
          if(pointer.rightButtonDown()){
                console.log("Libro pulsado");
                this.visible =! this.visible;
                this.Libro2.visible =! this.Libro2.visible;
            }
        })

        this.Libro2.on("pointerdown", pointer => {
            //hacer algo.
            if(pointer.rightButtonDown()){
                console.log("Libro pulsado");
                this.visible =! this.visible;
                this.Libro2.visible =! this.Libro2.visible;
            }
        })
    }
    cerrarSprites()
    {
        this.visible=false;
        this.Libro2.visible=false;
    }

    resetPos(){
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.Libro2.x = this.firstPosX;
        this.Libro2.y = this.firstPosY;
    }
}