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
        this.scene=scene;
        this.setScale(.3);
        scene.add.existing(this);
        this.setInteractive();
        
        this.Libro2=scene.add.sprite(x,y,sprite2).setInteractive();
        this.Libro2.setScale(.5)
  
        this.Libro2.visible=false; //visible permite hacer visible o no un sprite.
      
        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
          //hacer algo.
          console.log("Libro pulsado");
          this.visible=!this.visible;
        this.Libro2.visible=!this.Libro2.visible;
        })

        this.Libro2.on("pointerdown", pointer => {
            //hacer algo.
            console.log("Libro pulsado");
            this.visible=!this.visible;
        this.Libro2.visible=!this.Libro2.visible;
        })


    }  

    cerrarSprites()
    {
        this.visible=false;
        this.Libro2.visible=false;
    }
}