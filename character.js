import Dialogue from "./dialogue.js";
import Book from "./book.js";
import Clock from "./clock_class.js";
import Document from "./document.js";
import {characterConst} from "./constants.js";

export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, dialogue, dialogueSprite, bookSprite1, bookSprite2, documentSprite, genre, category, tamPags) {

        super(scene, x, y, sprite);

        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(characterConst.scale);
        this.scene.add.existing(this);
        this.npc=this.scene.sound.add("npcSound");


        this.setDepth(characterConst.depth);    //MOVER ESTO A CHARACTER
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.bringsBook = (genre != undefined); // Determina si el personaje trae un libro
        this.SPEED = characterConst.speed;
        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        //Dialogos
        this.texto = dialogue;
        this.dialogueSprite = dialogueSprite;
        this.dialogue = new Dialogue(scene, characterConst.dialoguePosX, characterConst.dialoguePosY, this.dialogueSprite, this.texto.slice(0, 3));
        this.dialogue.setVisible(false);

        //if(this.bringsBook){
        //Libro
        this.numPags = this.getNumPags(tamPags); // numero pags

        this.book = new Book(scene, characterConst.bookPosX, characterConst.bookPosY, bookSprite1, bookSprite2, genre, category, this.numPags); //Inicializa libro
        this.hasBook = false;
        //}


        //Documento
        //Inicializa documento
        this.docSprite = documentSprite;
        this.hasdocument = false;
        this.isGone = false;
    }

    EnterChar() { // El personaje entre (puerta)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
            //if(this.bringsBook){
            this.CreateBook();
            //}
            this.CreateDocument();

        }
    }

    StopChar() { // El personaje pare
        if (this.currentS === this.States.GOING) {
            this.body.setVelocityX(0);

            this.currentS = this.States.SHOW;

            this.dialogue.setVisible(true);
            this.npc.play();

            //if(this.bringsBook){
            this.ShowBook();
            //}
            this.document = new Document(this.scene, characterConst.documentPosX, characterConst.documentPosY, this.docSprite); 

            this.firstClock = new Clock(this.scene, 0, 0, this.dialogueSprite, this.dialogueSprite);
            this.firstClock.start(this.ShowFirstDialogue.bind(this), '7000');
            this.firstClock.setInvisible();

            this.secondClock = new Clock(this.scene, 0, 0, this.dialogueSprite, this.dialogueSprite);
            this.secondClock.start(this.ShowSecondDialogue.bind(this), '14000');
            this.secondClock.setInvisible();
        }
        else if (this.currentS === this.States.ANSWER) {
            this.body.setVelocityX(0);

            this.currentS = this.States.INI;
        }
    }

    AcceptChar() { // El personaje entre (aceptado)
        if (this.currentS === this.States.WAIT) {
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.ANSWER;
            this.firstClock.stop();
            this.secondClock.stop();
            this.dialogue.setText(this.texto.slice(12, 15))
            this.npc.play();
            //if(this.bringsBook){
            this.RetrieveBook();
            //}
            this.RetrieveDocument();
        }
    }

    DenyChar() // El personaje salga (denegado)
    {
        if (this.currentS === this.States.WAIT) {
            this.body.setVelocityX(this.SPEED);
            this.currentS = this.States.ANSWER;

            this.firstClock.stop();
            this.secondClock.stop();

            this.dialogue.setText(this.texto.slice(9, 12))
            this.npc.play();

            //if(this.bringsBook){
            this.RetrieveBook();
            //}
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

    CreateBook() { //Inicializa el libro del personaje 
        this.hasBook = true;
    }

    CreateDocument() { //Inicializa el documento del personaje 
        this.hasdocument = true;
    }

    RetrieveBook() { //
        if (this.hasBook) {
            this.book.cerrarSprites();
            this.book.resetPos(); //Devuelve posición inicial al book
        }
    }

    RetrieveDocument() { //
        if (this.hasdocument) {
            this.document.visible = false;
            this.document.resetPos(); //Devuelve posición inicial al book
        }
    }

    ShowBook() {
        if (this.hasBook) {
            this.book.visible = true;
            this.currentS = this.States.WAIT;
        }
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
            this.dialogue.setText(this.texto.slice(0, 3));
            this.dialogue.setVisible(false);
            this.isGone = true;
        }
        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.StopChar();
            this.dialogue.setText(this.texto.slice(0, 3));
            this.dialogue.setVisible(false);
            this.isGone = true;
        }
    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getNumPags(tam) {
        if (tam == 0) {
            return this.getRndInteger(characterConst.thinPags[0], characterConst.thinPags[1]);
        }
        else if (tam == 1) {
            return this.getRndInteger(characterConst.normalPags[0], characterConst.normalPags[1]);
        }
        else {
            return this.getRndInteger(characterConst.thickPags[0], characterConst.thickPags[1]);
        }
    }

}