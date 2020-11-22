
export default class DeskBell extends Phaser.GameObjects.Sprite  {

          /** @type {Phaser.GameObjects.Sprite} */
          Bell2

    constructor(scene,x,y, sprite, sprite2) {
      super(scene,x,y,sprite);
      this.scene = scene;
      this.setScale(.2);

      scene.add.existing(this);
      this.setInteractive(); //Lo hacemos interactivo (poder pulsarlo)

      this.Bell2 = scene.add.sprite(x,y,sprite2).setInteractive(); //Creamos el sprite 2 (timbre pulsado)
      this.Bell2.setScale(.2);

      this.Bell2.visible = false;
      this.clicked = false; //Creamos variable booleana clicked.

      //this.scene.physics.add.existing(this, true);

      //Cuando es pulsado dicho sprite...
      this.on('pointerdown', pointer => {
        if(pointer.leftButtonDown()) {
          console.log("Timbre pulsado");
          this.Bell2.visible =! this.Bell2.visible;
          this.visible =! this.visible;
          this.clicked = true;
        }
      });

      this.Bell2.on('pointerup', pointer => {
          this.Bell2.visible =! this.Bell2.visible;
          this.visible =! this.visible;
          this.clicked = false;
      });

 
    }
  }