import {guardConst} from "./constants.js";

export default class Character extends Phaser.GameObjects.Sprite {

    /** @type {Phaser.GameObjects.Text} */
    texto

    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.GameObjects.Sprite} */
    dialogueSprite

    constructor(scene, x, y, sprite, events) {

        super(scene, x, y, sprite);
        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(guardConst.scale);
        this.scene.add.existing(this);
        this.event = events;
        this.setDepth(guardConst.depth);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.SPEED = guardConst.speed;
        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;
    }

    EnterChar() { // El personaje entre (puerta)
        if (this.currentS === this.States.INI && this.event.chara.currentS === this.event.chara.States.WAIT) {
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    StopChar() { // El personaje pare
            this.body.setVelocityX(0);
            this.currentS = this.States.ANSWER;
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x < guardConst.midPos) { //Cuando llegue al medio, se detiene el personaje
            this.StopChar();
            this.body.setVelocityX(this.SPEED);
            this.event.DenyChar();
            //this.events.chara.DenyChar();
        }

        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
            this.currentS = this.States.INI;
        }
    }
}