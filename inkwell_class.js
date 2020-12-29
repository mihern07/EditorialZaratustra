import { inkwellConst } from "./constants.js";

export default class Inkwell extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;

    this.scene.physics.add.existing(this);
    this.body.allowGravity = false;

    scene.add.existing(this);

    this.setInteractive(); //Lo hacemos interactivo (puedes pulsarlo)
    this.clicked = false; //Creamos variable booleana clicked.
    this.setScale(inkwellConst.scale);

    //this.scene.physics.add.existing(this, true);


    //Cuando es pulsado dicho sprite...
    this.on('pointerdown', pointer => {
      if (pointer.isDown) {
        //console.log("Botón seguridad pulsado");
        this.clicked = true;
      }
    });

    this.on('pointerup', pointer => {
      //console.log("Botón seguridad pulsado");
      this.clicked = false;
    });
  }
}