import Dialogue from "./dialogue.js";
import Book from "./book.js";
import Clock from "./clock_class.js";
import Document from "./document.js";
import { characterConst, sceneConst } from "./constants.js";

export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, random, sprite, dialogue, dialogueSprite, documentSprite, bookSprite1, bookSprite2, genre, category, tamPags) {
        super(scene, x, y, sprite);

        this.category = category;

        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(characterConst.scale);
        this.scene.add.existing(this);
        this.npc = this.scene.sound.add("npcSound");

        this.xnow = 0;

        this.setDepth(characterConst.depth);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.SPEED = characterConst.speed;
        this.randoms = random;

        if(random)
        {
            this.setScale(characterConst.clothesScale);
            this.y = characterConst.clothesY;

            this.head = scene.add.sprite(this.x, characterConst.headY, this.chooseSpriteHead()).setInteractive();
            this.head.setDepth(characterConst.depth);
            this.head.setScale(characterConst.hairScale);

            this.scene.physics.add.existing(this.head);
            this.head.body.allowGravity = false;
            this.head.body.setVelocityX(0);

            this.hair = scene.add.sprite(this.x, characterConst.hairY, this.chooseSpriteHair()).setInteractive();
            this.hair.setDepth(characterConst.depth);
            this.hair.setScale(characterConst.hairScale);

            this.scene.physics.add.existing(this.hair);
            this.hair.body.allowGravity = false;
            this.hair.body.setVelocityX(0);
        }

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

        if (bookSprite1 != undefined) {
            //Libro
            this.numPags = this.getNumPags(tamPags); // numero pags

            this.book = new Book(scene, characterConst.bookPosX, characterConst.bookPosY, bookSprite1, bookSprite2, genre, category, this.numPags); //Inicializa libro
            this.hasBook = true;
        }
        else
            this.hasBook = false;
                  
        //Documento
        //Inicializa documento
        this.docSprite = documentSprite;
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
            if(this.randoms) 
            {
                this.head.body.setVelocityX(-this.SPEED);
                this.hair.body.setVelocityX(-this.SPEED);
            }
            this.currentS = this.States.GOING;
            this.CreateDocument();
        }
    }

    StopChar() { // El personaje pare
        if (this.currentS === this.States.GOING) {
            this.body.setVelocityX(0);
            if(this.randoms) 
            {
                this.head.body.setVelocityX(0);
                this.hair.body.setVelocityX(0);
            }

            this.currentS = this.States.SHOW;

            this.dialogue.setVisible(true);
            this.npc.play();

            this.ShowBook();

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
            if(this.randoms) 
            {
                this.head.body.setVelocityX(0);
                this.hair.body.setVelocityX(0);
            }

            this.currentS = this.States.INI;
        }
    }

    AcceptChar() { // El personaje entre (aceptado)
        if (this.currentS === this.States.WAIT) {
            this.body.setVelocityX(-this.SPEED);
            if(this.randoms) 
            {
                this.head.body.setVelocityX(-this.SPEED);
                this.hair.body.setVelocityX(-this.SPEED);
            }
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
            if(this.randoms) 
            {
                this.head.body.setVelocityX(this.SPEED);
                this.hair.body.setVelocityX(this.SPEED);
            }
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
        }
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
            if(this.randoms){
                this.y = characterConst.clothesY + Math.sin(2*Math.PI*(this.xnow/50))*6;
                this.head.y = characterConst.headY +  Math.sin(2*Math.PI*(this.xnow/50))*4;
                this.hair.y = characterConst.hairY + Math.sin(2*Math.PI*(this.xnow/50))*4;
            }
            else{
                this.y = sceneConst.eventsPosY + Math.sin(2*Math.PI*(this.xnow/50))*5;
            }
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

    getCategory(){
        return this.category;
    }

    refuseDenial(){
        this.dialogue.setText(this.texto.slice(15, 18));
        this.npc.play();
    }
}