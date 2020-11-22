export default class RedButton extends Phaser.GameObjects.Sprite  {

constructor(scene,x,y, sprite, sprite2) {
super(scene,x,y,sprite);
this.scene=scene;

scene.add.existing(this);
this.setInteractive();
this.clicked = false;

this.setScale(.7);

//this.scene.physics.add.existing(this, true);


this.on('pointerdown', pointer => {
  if (pointer.isDown) {
    console.log("Botón seguridad pulsado");
      this.clicked = true;
  }
});

this.on('pointerup', pointer => {
      console.log("Botón seguridad pulsado");
        this.clicked = false;
  });
}
}