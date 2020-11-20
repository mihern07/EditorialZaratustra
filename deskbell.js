//import Clock from "./Clock.js";

export default class DeskBell extends Phaser.GameObjects.Sprite  {
    constructor(scene,x,y, sprite) {
      super(scene,x,y,sprite);
      this.mouse = scene.input.activePointer;
      this.setInteractive();

      this.setScale(.4);

      scene.add.existing(this);
      
      //this.scene.physics.add.existing(this, true);

      this.on('pointerdown', mouse => {
        if (mouse.leftButtonDown()) {
            changeSprite();
        }
      }  , this);
    }

    changeSprite(){
      
    }
  }