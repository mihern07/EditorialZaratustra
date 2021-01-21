import { guardConst } from "./constants.js";
export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, events) {

        super(scene, x, y, sprite);
        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(guardConst.scale);
        this.scene.add.existing(this);
        this.event = events;
        this.setDepth(guardConst.depth);

        //Movimiento visual
        this.defaultY = y;
        this.xnow = 0;

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.SPEED = guardConst.speed;

        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;
    }

    enterChar() { // El personaje entre (puerta)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    stopChar() { // El personaje pare
        this.body.setVelocityX(0);
        this.currentS = this.States.ANSWER;
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x < guardConst.midPos) { //Cuando llegue al medio, se detiene el personaje
            this.stopChar();
            this.body.setVelocityX(this.SPEED);
            this.event.denyChar();
            //this.events.chara.DenyChar();
        }

        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.stopChar();
            this.x = this.firstPosX;
            this.currentS = this.States.INI;
        }

        else if (this.currentS === this.States.GOING || this.currentS === this.States.ANSWER) {
            this.y = this.defaultY + Math.sin(2 * Math.PI * (this.xnow / 50)) * 5;
            this.xnow++;
        }
    }
}