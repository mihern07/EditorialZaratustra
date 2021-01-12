import Dialogue from "./dialogue.js";
import Clock from "./clock_class.js";
import Document from "./document.js";
import Newspaper from "./newspaper.js";
import { characterConst } from "./constants.js";

export default class NewsCharacter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, dialogue ,day, month, year, news) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(characterConst.scale);
        this.scene.add.existing(this);
        this.npc = this.scene.sound.add("npcSound");

        //Visual de movimiento
        this.defaultY = y;
        this.xnow = 0;

        this.setDepth(characterConst.depth);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.SPEED = characterConst.speed;

        this.sprite2 = scene.add.sprite(this.x, characterConst.headY, this.chooseSpriteHead()).setInteractive();
        this.sprite2.setDepth(characterConst.depth);
        this.sprite2.setScale(characterConst.hairScale);

        this.scene.physics.add.existing(this.sprite2);
        this.sprite2.body.allowGravity = false;
        this.sprite2.body.setVelocityX(0);

        this.sprite3 = scene.add.sprite(this.x, characterConst.hairY, this.chooseSpriteHair()).setInteractive();
        this.sprite3.setDepth(characterConst.depth);
        this.sprite3.setScale(characterConst.hairScale);

        this.scene.physics.add.existing(this.sprite3);
        this.sprite3.body.allowGravity = false;
        this.sprite3.body.setVelocityX(0);


        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        this.texto = dialogue;
        this.dialogue = new Dialogue(scene, characterConst.dialoguePosX, characterConst.dialoguePosY, "box", this.texto.slice(0, 3));
        this.dialogue.setVisible(false);

        this.newspaper = new Newspaper(scene, scene.game.config.width / 2, scene.game.config.height / 1.5, "littleNewspaper", "bigNewspaper", day, month, year, news)
        this.newspaper.visible = false;

        //Documento
        //Inicializa documento
        this.hasdocument = false;
        this.isGone = false;
    }

    chooseSpriteHair() {
        this.value = this.getRndInteger(0,7);
        switch(this.value) //PELO DEL CHARACTER
        {
            case 0:
            this.sprite = "hair1";
            break;
            case 1:
                this.sprite = "hair2";
            break;
            case 2:
                this.sprite = "hair3";
            break;
            case 3:
                this.sprite = "hair4";
            break;
            case 4:
                this.sprite = "hair5";
            break;
            case 5:
                this.sprite = "hair6";
            break;
            case 6:
                this.sprite = "hair7";
            break;
            case 7:
                this.sprite = "hair8";
            break;
        }
        return this.sprite;
    }

    chooseSpriteHead() {
        this.value = this.getRndInteger(0,4);
        switch(this.value) //PELO DEL CHARACTER
        {
            case 0:
            this.sprite = "head1";
            break;
            case 1:
                this.sprite = "head2";
            break;
            case 2:
                this.sprite = "head3";
            break;
            case 3:
                this.sprite = "head4";
            break;
            case 4:
                this.sprite = "head5";
            break;
        }
        return this.sprite;
    }

    EnterChar() { // El personaje entre (puerta)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(-this.SPEED);
            this.sprite2.body.setVelocityX(-this.SPEED);
            this.sprite3.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
            this.CreateDocument();
        }
    }

    StopChar() { // El personaje pare
        if (this.currentS === this.States.GOING) {
            this.body.setVelocityX(0);
            this.sprite2.body.setVelocityX(0);
            this.sprite3.body.setVelocityX(0);

            this.currentS = this.States.SHOW;

            this.dialogue.setVisible(true);
            this.npc.play();

            this.ShowBook();

            this.document = new Document(this.scene, characterConst.documentPosX, characterConst.documentPosY, "document");

            this.firstClock = new Clock(this.scene, 0, 0, this.dialogueSprite, this.dialogueSprite);
            this.firstClock.start(this.ShowFirstDialogue.bind(this), '7000');
            this.firstClock.setInvisible();

            this.secondClock = new Clock(this.scene, 0, 0, this.dialogueSprite, this.dialogueSprite);
            this.secondClock.start(this.ShowSecondDialogue.bind(this), '14000');
            this.secondClock.setInvisible();
        }
        else if (this.currentS === this.States.ANSWER) {
            this.body.setVelocityX(0);
            this.sprite2.body.setVelocityX(0);
            this.sprite3.body.setVelocityX(0);

            this.currentS = this.States.INI;
        }
    }

    AcceptChar() { // El personaje entre (aceptado)
        if (this.currentS === this.States.WAIT) {
            this.body.setVelocityX(-this.SPEED);
            this.sprite2.body.setVelocityX(-this.SPEED);
            this.sprite3.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.ANSWER;
            this.firstClock.stop();
            this.secondClock.stop();
            this.dialogue.setText(this.texto.slice(12, 15))
            this.npc.play();

            this.RetrieveBook();
            this.RetrieveDocument();
        }
    }

    DenyChar() // El personaje salga (denegado)
    {
        if (this.currentS === this.States.WAIT) {
            this.body.setVelocityX(this.SPEED);
            this.sprite2.body.setVelocityX(this.SPEED);
            this.sprite3.body.setVelocityX(this.SPEED);
            
            this.currentS = this.States.ANSWER;

            this.firstClock.stop();
            this.secondClock.stop();

            this.dialogue.setText(this.texto.slice(9, 12))
            this.npc.play();

            this.RetrieveBook();
            this.RetrieveDocument();
        }
    }

    ShowFirstDialogue() {
        this.dialogue.setText(this.texto.slice(3, 6))
        this.npc.play();
    }

    ShowSecondDialogue() {
        this.dialogue.setText(this.texto.slice(6, 9))
        this.npc.play();
    }

    CreateDocument() { //Inicializa el documento del personaje 
        this.hasdocument = true;
    }

    RetrieveBook() { //
        this.newspaper.destroy();
    }

    RetrieveDocument() { //
        if (this.hasdocument) {
            this.document.visible = false;
            this.document.resetPos(); //Devuelve posición inicial al book
        }
    }

    ShowBook() {
        this.newspaper.visible = true;        
        this.currentS = this.States.WAIT;
    }

    checkGone() {
        return this.isGone;
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x < characterConst.midPos) { //Cuando llegue al medio, se detiene el personaje
            this.StopChar();

        }
        else if (this.currentS === this.States.ANSWER && this.x < characterConst.outPos) { //Cuando salga del campo de vision, por la izquierda, se le reinicia
            this.StopChar();
            this.dialogueChange();
            this.isGone = true;
        }
        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.StopChar();
            this.dialogueChange();
            this.isGone = true;
        }
        else if(this.currentS === this.States.GOING || this.currentS === this.States.ANSWER){
            this.y = this.defaultY + Math.sin(2*Math.PI*(this.xnow/50))*5;
            this.xnow++;
        }
    }

    dialogueChange() {
        this.dialogue.setText(this.texto.slice(0, 3));
        this.dialogue.setVisible(false);
    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}