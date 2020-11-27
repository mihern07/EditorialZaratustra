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

        this.visible = false;

        this.setScale(.3);
        
        //Lo añade a la escena
        scene.add.existing(this);
        
        //Permite interactuar con él
        this.setInteractive({draggable: true, dropZone: true});

        //Sprite ibro abierto
        this.Libro2 = scene.add.sprite(this.x,this.y,sprite2).setInteractive();
        this.Libro2.setScale(.5)
        this.Libro2.visible = false; 

        //Configuración del Drag        
        //this.bound = new Phaser.Geom.Rectangle(100, 100, 500, 400);
        //this.body.setBoundsRectangle(this.bound);

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