import { alarmConst } from "./constants.js";
export default class Alarm extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, bodyguards, events) {
    super(scene, x, y, sprite);

    this.scene = scene;
    this.event = events;
    this.setScale(alarmConst.scale);

    //Referencia al guardia en la escena
    this.bodyguard = bodyguards;

    this.alarm = this.scene.sound.add("alarm");

    scene.add.existing(this);
    this.setInteractive();

    //Sprite de no pulsado
    this.bell2 = scene.add.sprite(x, y, "alarmNoPressed").setInteractive();
    this.bell2.setScale(alarmConst.scale);

    //Sprite de pulsado
    this.bell3 = scene.add.sprite(x, y, "alarmPressed").setInteractive(); //Creamos el sprite 3 (timbre pulsado)
    this.bell3.setScale(alarmConst.scale);

    this.bell2.visible = false;
    this.bell3.visible = false;

    //Cuando pulsas la alarma
    this.bell2.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        //Se cambia su sprite a pulsado y suena
        this.changeSprite();
        console.log("Timbre pulsado");
        this.alarm.play();

        //Llama al guardia para que entre
        this.bodyguard.enterChar();
      }
    });

    //Cuando dejas de pulsar la alarma
    this.bell3.on('pointerup', pointer => {
      //Cambiamos su sprite a no estar siendo pulsado
      this.setItOff();
    });
  }

  preUpdate() {
    //Si el personaje está esperando frente al escritorio y no se está usando la alarma
    if (this.event.chara.currentS === this.event.chara.States.WAIT && this.isOff) {
      //La alarma puede ser usada
      this.isOff = false;

      //Se cambia el sprite a alarma disponible
      this.bell2.visible = true;
      this.bell3.visible = false;
      this.visible = false;
    }

    //Si no hay ningún personaje esperando frente al escritorio
    if (this.event.chara.currentS === this.event.chara.States.INI || this.event.chara.currentS === this.event.chara.States.ANSWER) {
      //No se puede usar la alarma
      this.isOff = true;
      this.setItOff();
    }
  }

  //Muestra a la alarma como no disponible
  setItOff() {
    this.visible = true;
    this.bell2.visible = false;
    this.bell3.visible = false;
  }

  //Cambia los sprites de si está o no pulsando
  changeSprite() {
    this.bell2.visible = !this.bell2.visible;
    this.bell3.visible = !this.bell3.visible;
  }
}