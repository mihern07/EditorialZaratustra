import Dialogue from "./dialogue.js";

export default class Boss extends Phaser.GameObjects.Sprite {

    /** @type {Phaser.GameObjects.Text} */
    texto

    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.GameObjects.Sprite} */
    dialogueSprite

    constructor(scene, x, y, sprite, dialogue, dialogueSprite, level) {

        super(scene, x, y, sprite);
        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(.5);
        this.scene.add.existing(this);
        this.setDepth(-2);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.texto = dialogue;
        this.dialogueSprite = dialogueSprite;
        this.dialogue = new Dialogue(scene, 530, 415, this.dialogueSprite, this.texto.slice(level, level+3));
        this.dialogue.setVisible(false);

        this.SPEED = 190;
        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        this.scene.input.on('pointerdown', () => {
            if(this.currentS === this.States.WAIT){
                this.GoBack();
            }
          });
    }

    EnterChar() { // El personaje entre (izq)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    GoBack(){
        this.dialogue.setVisible(false);
        this.currentS = this.States.ANSWER;
        this.body.setVelocityX(-this.SPEED);
    }

    StopChar() { // El personaje pare
        this.body.setVelocityX(0);
        this.currentS = this.States.WAIT;
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x > 540) { //Cuando llegue al medio, se detiene el personaje
            this.StopChar();
            //DIALOGO
            this.dialogue.setVisible(true);
        }

        else if (this.currentS === this.States.ANSWER && this.x < this.firstPosX) { //Cuando salga del campo de vision, por la izquierda, desaparece
            this.visible = false;
            this.scene.bossAnswered = true;
        }
    }
}