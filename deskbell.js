import Events from "./events.js"
export default class DeskBell extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, sprite2, events, sound) {
    super(scene, x, y, sprite);
    this.events = events;
    this.sounds = sound;

    this.scene = scene;
    this.setScale(.2);

    scene.add.existing(this);
    this.setInteractive(); //Lo hacemos interactivo (poder pulsarlo)

    this.Bell2 = scene.add.sprite(x, y, sprite2).setInteractive(); //Creamos el sprite 2 (timbre pulsado)
    this.Bell2.setScale(.2);

    this.Bell2.visible = false;
    this.working = false;
    //this.scene.physics.add.existing(this, true);

    //Cuando es pulsado dicho sprite...
    this.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        console.log("Timbre pulsado");
        this.sounds.play();
        
        if(this.working){
          this.events.EnterChar();
        }
        this.Bell2.visible = !this.Bell2.visible;
        this.visible = !this.visible;
      }
    });

    this.Bell2.on('pointerup', pointer => {
      this.Bell2.visible = !this.Bell2.visible;
      this.visible = !this.visible;
    });


  }

  startWork(){
    this.working = true;
  }

}