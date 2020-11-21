export default class DeskBell extends Phaser.GameObjects.Sprite  {

          /** @type {Phaser.GameObjects.Sprite} */
          Libro2

    constructor(scene,x,y, sprite, sprite2) {
      super(scene,x,y,sprite);
      this.scene=scene;
      this.setScale(.2);

      scene.add.existing(this);
      this.setInteractive();

      this.Libro2=scene.add.sprite(x,y,sprite2).setInteractive();
      this.Libro2.setScale(.2)

      this.Libro2.visible=false;
      
      //this.scene.physics.add.existing(this, true);


      this.on('pointerdown', pointer => {
        if (pointer.isDown) {
          console.log("Timbre pulsado");
            this.Libro2.visible=!this.Libro2.visible;
            this.visible=!this.visible;
        }
      });

      this.Libro2.on('pointerup', pointer => {
            this.Libro2.visible=!this.Libro2.visible;
            this.visible=!this.visible;
      });
    }

    // changeSprite(){
      
    // }
  }