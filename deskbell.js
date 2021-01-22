import { deskBellConst } from "./constants.js"
export default class DeskBell extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, sprite2, events, sound) {
    super(scene, x, y, sprite);
    this.events = events;
    this.sounds = sound;

    this.scene = scene;
    scene.add.existing(this);

    this.setScale(deskBellConst.scale);
    this.setInteractive();
    
    //Creamos el sprite 2 (timbre pulsado)
    this.bell2 = scene.add.sprite(x, y, sprite2).setInteractive();
    this.bell2.setScale(deskBellConst.scale);
    this.bell2.visible = false;

    this.working = false;

    //Cuando es pulsado dicho sprite...
    this.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        console.log("Timbre pulsado");
        this.sounds.play();

        //Si es true, llama a un character
        if (this.working) {
          this.events.enterChar();
        }
        this.changeSprites();
      }
    });

    this.bell2.on('pointerup', pointer => {
      this.changeSprites();
    });
  }

  //Cambiamos la visibilidad de los sprites
  changeSprites() {
    this.bell2.visible = !this.bell2.visible;
    this.visible = !this.visible;
  }

  //Ponemos this.working a true
  startWork() {
    this.working = true;
  }

}