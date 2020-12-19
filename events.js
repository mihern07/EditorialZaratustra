import Personaje from "./character.js";

export default class Events extends Phaser.GameObjects.GameObject {

    /** @type {Phaser.Scene} */
    scene

    x   //Posición del personaje

    y   //Posición del personaje

    /** @type {Phaser.GameObjects.Sprite} */
    sprite              //Sprite del personaje

    //Variables para los diálogos
    dialogueNinio
    dialogueTendencias
    dialogueCorreos
    dialogueCorreosFalso
    dialogueMujerDelJefe
    dialogueMujerDelJefeFalsa
    dialogueSobornador
    dialogueVagabundo

    /** @type {Phaser.GameObjects.Sprite} */
    dialogueSprite      //Sprite con el cuadro de texto

    /** @type {Phaser.GameObjects.Sprite} */
    bookSprite1              //Sprite del libro1

    /** @type {Phaser.GameObjects.Sprite} */
    bookSprite2              //Sprite del libro2

    /** @type {Phaser.GameObjects.Sprite} */
    documentSprite           //Sprite del documento

    enum        //Enum con los tipos de personaje

    chara

    currentCharacterType


    constructor(scene, x, y, sprite, dialogueJefe, dialogueNinio, dialogueTendencias, dialogueCorreos, dialogueCorreosFalso, dialogueMujerDelJefe,
        dialogueMujerDelJefeFalsa, dialogueSobornador, dialogueVagabundo, dialogueBase, dialogueSprite, bookSprite1, bookSprite2, documentSprite, bookInfo) {
        super(scene, x, y);

        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scene = scene;

        //Diálogos
        this.dialogueJefe = dialogueJefe;
        this.dialogueNinio = dialogueNinio;
        this.dialogueTendencias = dialogueTendencias;
        this.dialogueCorreos = dialogueCorreos;
        this.dialogueCorreosFalso = dialogueCorreosFalso;
        this.dialogueMujerDelJefe = dialogueMujerDelJefe;
        this.dialogueMujerDelJefeFalsa = dialogueMujerDelJefeFalsa;
        this.dialogueSobornador = dialogueSobornador;
        this.dialogueVagabundo = dialogueVagabundo;
        this.dialogueBase = dialogueBase;
        this.bookInfo = bookInfo;

        this.dialogueSprite = dialogueSprite;
        this.bookSprite1 = bookSprite1;
        this.bookSprite2 = bookSprite2;
        this.documentSprite = documentSprite;

        //Enum con todos los tipos distintos de personaje
        this.enum = {
            jefe: -1, normal: 0, ninio: 1, tendencias: 2, correos: 3, correosFalso: 4, mujerDelJefe: 5, mujerDelJefeFalsa: 6,
            sobornador: 7, vagabundo: 8, libroCorrecto: 9, libroIncorrecto: 10
        };

        //Determina el tipo de personaje que hay actualmente
        this.SetRandomChara();
    }

    createCharacter(tipo) {
        switch (tipo) {
            case -1:
                //Jefe
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueJefe, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 0:
                //Personaje normal
                //Crear personaje normal sin diálogo (Quizás tendremos que mover los diálogos al Events o añadir un booleano a character)
                break;
            case 1:
                //Niño
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueNinio, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 2:
                //Personaje tendencias
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueTendencias, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 3:
                //Correos
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreos, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 4:
                //Correos falso
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreosFalso, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 5:
                //Mujer del jefe
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefe, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 6:
                //Mujer del jefe falsa
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefeFalsa, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 7:
                //Sobornador
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueSobornador, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 8:
                //Vagabundo
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 9:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                this.createCorrectBook();
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, "libroC" + this.category, "libroA" + this.category, this.documentSprite, this.genre, this.category, this.tamPags);
                break;
            case 10:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                this.createIncorrectChara();
                break;
            default:
                console.log("El personaje buscado no existe");
                break;
        }
    }

    update() {
        if(this.chara.checkGone()){
            this.chara.destroy();
            this.SetRandomChara();
        }
        this.CharaShowBook();

    }

    CharaShowBook() {
        if (this.chara.currentS === this.chara.States.SHOW) {
            this.chara.ShowBook();
            this.chara.ShowDocument();
        }
    }

    EnterChar() {
        this.chara.EnterChar();
    }

    DenyChar() {   
        this.chara.DenyChar();
    }

    AcceptChar() {
        this.chara.AcceptChar();
    }

    SetRandomChara(){
        let rnd = this.getRndInteger(0, 1); 
        if (rnd == 0) {
            this.currentCharacterType = this.enum.libroCorrecto; 
        }
        else{
            this.currentCharacterType = this.enum.libroIncorrecto;
        } 

        this.createCharacter(this.currentCharacterType);
    }

    createCorrectBook() {
        let notEmptyGenre = [];
        if (this.bookInfo.novelaBien.length != 0) {
            notEmptyGenre.push(this.bookInfo.novelaBien);
        }
        if (this.bookInfo.poesiaBien.length != 0) {
            notEmptyGenre.push(this.bookInfo.poesiaBien);
        }
        if (this.bookInfo.teatroBien.length != 0) {
            notEmptyGenre.push(this.bookInfo.teatroBien);
        }
        let selectGenre = this.getRndInteger(0, notEmptyGenre.length - 1);

        //Añadir random entre las 3
        if (notEmptyGenre[selectGenre] == this.bookInfo.novelaBien) {
            this.genre = "Novela";
            this.category = this.bookInfo.novelaBien[this.getRndInteger(0, this.bookInfo.novelaBien.length - 1)];
        }
        else if (notEmptyGenre[selectGenre] == this.bookInfo.poesiaBien) {
            this.genre = "Poesía";
            this.category = this.bookInfo.poesiaBien[this.getRndInteger(0, this.bookInfo.poesiaBien.length - 1)];
        }
        else if (notEmptyGenre[selectGenre] == this.bookInfo.teatroBien) {
            this.genre = "Teatro";
            this.category = this.bookInfo.teatroBien[this.getRndInteger(0, this.bookInfo.teatroBien.length - 1)];
        }

        this.tamPags = this.bookInfo.numPagsBien[this.getRndInteger(0, this.bookInfo.numPagsBien.length - 1)];
    }

    createIncorrectChara() {
        this.createCorrectBook(); // Crea un libro correcto
        let wrongAspect = this.getRndInteger(0, 2); // Selecciona el aspecto que será erróneo
        switch (wrongAspect) {
            case 0:
                //Categoría errónea
                let notEmptyGenre = [];
                if (this.bookInfo.novelaMal.length != 0) {
                    notEmptyGenre.push(this.bookInfo.novelaMal);
                }
                if (this.bookInfo.poesiaMal.length != 0) {
                    notEmptyGenre.push(this.bookInfo.poesiaMal);
                }
                if (this.bookInfo.teatroMal.length != 0) {
                    notEmptyGenre.push(this.bookInfo.teatroMal);
                }
                let selectGenre = this.getRndInteger(0, notEmptyGenre.length - 1);

                //Añadir random entre las 3
                if (notEmptyGenre[selectGenre] == this.bookInfo.novelaMal) {
                    this.genre = "Novela";
                    this.category = this.bookInfo.novelaMal[this.getRndInteger(0, this.bookInfo.novelaMal.length - 1)];
                }
                else if (notEmptyGenre[selectGenre] == this.bookInfo.poesiaMal) {
                    this.genre = "Poesía";
                    this.category = this.bookInfo.poesiaMal[this.getRndInteger(0, this.bookInfo.poesiaMal.length - 1)];
                }
                else if (notEmptyGenre[selectGenre] == this.bookInfo.teatroMal) {
                    this.genre = "Teatro";
                    this.category = this.bookInfo.teatroMal[this.getRndInteger(0, this.bookInfo.teatroMal.length - 1)];
                }
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, "libroC" + this.category, "libroA" + this.category, this.documentSprite, this.genre, this.category, this.tamPags);
                break;
            case 1:
                //Número de páginas Incorrecto
                this.tamPags = this.bookInfo.numPagsMal[this.getRndInteger(0, this.bookInfo.numPagsMal.length - 1)];
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, "libroC" + this.category, "libroA" + this.category, this.documentSprite, this.genre, this.category, this.tamPags);
                break;
            case 2:
                //Sprite Incorrecto
                do {
                    this.wrongSprite = this.bookInfo.everyCategory[this.getRndInteger(0, this.bookInfo.everyCategory.length - 1)];
                } while (this.wrongSprite == this.category);

                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, "libroC" + this.wrongSprite, "libroA" + this.wrongSprite, this.documentSprite, this.genre, this.category, this.tamPags);
                break;
        }

    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}