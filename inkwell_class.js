import { inkwellConst } from "./constants.js";

export default class Inkwell extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;

    this.scene.physics.add.existing(this);
    this.body.allowGravity = false;

    scene.add.existing(this);

    this.setScale(inkwellConst.scale);
  }
}