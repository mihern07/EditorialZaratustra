import { alarmConst } from "./constants.js";
export default class Alarm extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, bodyguards, events) {
    super(scene, x, y, sprite);

    this.scene = scene;
    this.event = events;
    this.setScale(alarmConst.scale);

    this.bodyguard = bodyguards;
    this.alarm=this.scene.sound.add("alarm");

    scene.add.existing(this);
    this.setInteractive(); //Lo hacemos interactivo (poder pulsarlo)

    this.Bell2 = scene.add.sprite(x, y, "alarmNoPressed").setInteractive(); //Creamos el sprite 2 (timbre encendido no pulsado)
    this.Bell2.setScale(alarmConst.scale);

    this.Bell3 = scene.add.sprite(x, y, "alarmPressed").setInteractive(); //Creamos el sprite 3 (timbre pulsado)
    this.Bell3.setScale(alarmConst.scale);

    this.Bell2.visible = false;
    this.Bell3.visible=false;
    //this.isOff=true;
    //this.scene.physics.add.existing(this, true);

    //Cuando es pulsado dicho sprite... && this.event.chara.currentS === this.event.chara.States.WAIT

    this.Bell2.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        this.changeSprite();
        console.log("Timbre pulsado");
        this.alarm.play();
        this.bodyguard.enterChar();
      }
    });

    this.Bell3.on('pointerup', pointer => {
      this.setItOff();
    });
  }

  preUpdate() {
    if(this.event.chara.currentS === this.event.chara.States.WAIT && this.isOff) 
    {
      this.isOff = false;

      this.Bell2.visible = true;
      this.Bell3.visible = false;
      this.visible = false;
    }  

    if(this.event.chara.currentS===this.event.chara.States.INI || this.event.chara.currentS===this.event.chara.States.ANSWER)
    {
      this.isOff = true;
      this.setItOff();
    }
  }

  setItOff() {
    this.visible = true;
    this.Bell2.visible = false;
    this.Bell3.visible = false;
  }

  changeSprite() {
    this.Bell2.visible = !this.Bell2.visible;
    this.Bell3.visible = !this.Bell3.visible;
  }
}