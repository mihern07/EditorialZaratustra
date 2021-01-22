import { guardConst } from "./constants.js";
export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, events) {

        super(scene, x, y, sprite);
        this.scene = scene;

        //Posición inicial del guardia
        this.firstPosX = this.x;

        this.setScale(guardConst.scale);
        this.scene.add.existing(this);
        this.event = events;
        this.setDepth(guardConst.depth);

        //Movimiento visual
        this.defaultY = y;
        this.xnow = 0;

        //Físicas del guardia: sin gravedad y empieza parado
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        //Velocidad del movimiento del guardia
        this.SPEED = guardConst.speed;

        //Posibles estados del guardia
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;
    }

    //El guardia entra
    enterChar() {
        if (this.currentS === this.States.INI) {
            //El guardia se mueve hacia el centro del escenario
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    //Para al guardia
    stopChar() {
        this.body.setVelocityX(0);
        this.currentS = this.States.ANSWER;
    }

    preUpdate() {

        //Cuando llegue al medio
        if (this.currentS === this.States.GOING && this.x < guardConst.midPos) {
            //Se detiene
            this.stopChar();
            
            //Se va
            this.body.setVelocityX(this.SPEED);

            //Deniega al personaje por el jugador
            this.event.denyChar();
        }

        //Cuando salga del campo de vision, por la izquierda, se le reinicia
        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { 
            this.stopChar();
            this.x = this.firstPosX;
            this.currentS = this.States.INI;
        }

        //Animación de movimiento arriba y abajo
        else if (this.currentS === this.States.GOING || this.currentS === this.States.ANSWER) {
            this.y = this.defaultY + Math.sin(2 * Math.PI * (this.xnow / 50)) * 5;
            this.xnow++;
        }
    }
}