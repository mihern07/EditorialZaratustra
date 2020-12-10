import Dialogue from "./dialogue.js";
import Book from "./book.js";
import Clock from "./clock.js";
import Document from "./document.js";

export default class Character extends Phaser.GameObjects.Sprite {

    /** @type {Phaser.GameObjects.Text} */
    texto

    dialogue

    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.GameObjects.Sprite} */
    dialogueSprite

    constructor(scene, x, y, sprite, dialogue, dialogueSprite, bookSprite1, bookSprite2, documentSprite) {

        super(scene, x, y, sprite);
        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(.5);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.SPEED = 190;
        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        //Dialogos
        this.texto = dialogue;
        this.dialogueSprite = dialogueSprite;
        this.dialogue = new Dialogue(scene, 530, 415, this.dialogueSprite, this.texto.slice(0, 3));
        this.dialogue.setVisible(false);

        //Libro
        // La gestión del tipo de libro tendría que hacerse en la clase que llama a cada personaje
        this.tamPags = { thin: 0, normal: 1, thick: 2 };
        this.numPags = this.getNumPags(this.tamPags.thin); // numero pags
        this.genre = ["Novela", "Poesía", "Teatro"];
        this.category = ["Romance", "Aventura", "Suspense", "Histórico", "Policiaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"];

        this.book = new Book(scene, 500, 550, bookSprite1, bookSprite2, this.genre[0], this.category[0], this.numPags); //Inicializa libro
        this.hasBook = false;

        //Documento
        this.document = new Document(scene, 650, 550, documentSprite); //Inicializa documento
        this.hasdocument = false;
    }

    EnterChar() { // El personaje entre (puerta)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
            this.CreateBook();
            this.CreateDocument();
        }
    }

    StopChar() { // El personaje pare
        if (this.currentS === this.States.GOING) {
            this.body.setVelocityX(0);

            this.currentS = this.States.SHOW;

            this.dialogue.setVisible(true);

            this.ShowBook();
            this.ShowDocument();

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
            this.RetrieveBook();
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

            this.RetrieveBook();
            this.RetrieveDocument();
        }
    }

    ShowFirstDialogue() {
        this.dialogue.setText(this.texto.slice(3, 6))
    }

    ShowSecondDialogue() {
        this.dialogue.setText(this.texto.slice(6, 9))
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

    ShowDocument() {
        if (this.hasdocument) {
            this.document.visible = true;
        }
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x < 540) { //Cuando llegue al medio, se detiene el personaje
            this.StopChar();

        }
        else if (this.currentS === this.States.ANSWER && this.x < 120) { //Cuando salga del campo de vision, por la izquierda, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
            this.dialogue.setText(this.texto.slice(0, 3));
            this.dialogue.setVisible(false);
        }
        else if (this.currentS === this.States.ANSWER && this.x > this.firstPosX) { //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
            this.dialogue.setText(this.texto.slice(0, 3));
            this.dialogue.setVisible(false);
        }
    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getNumPags(tam) {
        if (tam == 0) {
            return this.getRndInteger(25, 150);
        }
        else if (tam == 1) {
            return this.getRndInteger(400, 700);
        }
        else {
            return this.getRndInteger(1200, 3000);
        }
    }

}