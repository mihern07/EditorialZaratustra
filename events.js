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
        dialogueMujerDelJefeFalsa, dialogueSobornador, dialogueVagabundo, dialogueBase, dialogueSprite, bookSprite1, bookSprite2, documentSprite, bookInfo,
        order, gameManager) {
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
        this.order = order;
        this.gameManager = gameManager;
        this.contKnownCharas = 0;

        //Enum con todos los tipos distintos de personaje
        this.charaTypes = {
            ninio: 0, tendencias: 1, correos: 2, correosFalso: 3, mujerDelJefe: 4, mujerDelJefeFalsa: 5,
            sobornador: 6, vagabundo: 7, libroCorrecto: 8, libroIncorrecto: 9
        };

        let cont = 0;
        this.clientOrder = [];
        for (let i = 0; i < this.order.numCorrects; i++) { // Añade los minimos correctos
            this.clientOrder.push(this.charaTypes.libroCorrecto);
            cont++;
        }
        for (let i = cont; i < this.order.minBooks; i++) { // Añade el resto (correctos o incorrectos)
            this.clientOrder.push(this.getRndInteger(this.charaTypes.libroCorrecto, this.charaTypes.libroIncorrecto));
        }
        for (let i = 0; i < this.order.specialChara.length; i++) { // Añade los personajes de evento
            this.clientOrder.push(this.order.specialChara[i]);
        }
        this.clientOrder = this.clientOrder.sort(() => Math.random() - 0.5); // Mezcla elementos de la array (https://flaviocopes.com/how-to-shuffle-array-javascript/)

        console.log(this.clientOrder);
        //Crea el primer personaje
        this.SetChara();
    }

    createCharacter(tipo) {
        switch (tipo) {
            case 0:
                //Niño
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueNinio, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 1:
                //Personaje tendencias
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueTendencias, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 2:
                //Correos
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreos, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 3:
                //Correos falso
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreosFalso, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 4:
                //Mujer del jefe
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefe, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 5:
                //Mujer del jefe falsa
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefeFalsa, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 6:
                //Sobornador
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueSobornador, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 7:
                //Vagabundo
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 8:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                this.createCorrectBook();
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, "libroC" + this.category, "libroA" + this.category, this.documentSprite, this.genre, this.category, this.tamPags);
                this.isCorrectCharacter = true;
                break;
            case 9:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                this.createIncorrectChara();
                this.isCorrectCharacter = false;
                break;
            default:
                console.log("El personaje buscado no existe");
                break;
        }
    }

    update() {
        if (this.chara.checkGone()) {
            this.chara.destroy();
            if (this.contKnownCharas < this.clientOrder.length){ // creación de nuevo personaje
                this.SetChara();
            }
            else{
                this.SetRandomChara();
            }
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
        console.log(this.gameManager.dinero);
        console.log(this.gameManager.strikes);
        console.log(this.gameManager.bookStrikeCont);
    }

    AcceptChar() {
        this.chara.AcceptChar();
        if (this.isCorrectCharacter){ // adicion de puntos
            this.gameManager.AddSubstractMoney(200); // 20 será constante 
        }
        else{
            this.gameManager.BookStrike();
        }
        console.log(this.gameManager.dinero);
        console.log(this.gameManager.strikes);
        console.log(this.gameManager.bookStrikeCont);
    }

    // Crea el siguiente personaje en la lista de necesarios
    SetChara() {  
        //this.currentCharacterType = this.charaTypes.libroIncorrecto;
        this.createCharacter(this.clientOrder[this.contKnownCharas]);
        this.contKnownCharas++;
    }

    // Crea un personaje aleatorio entre correcto e incorrecto
    SetRandomChara() {
        let rnd = this.getRndInteger(this.charaTypes.libroCorrecto, this.charaTypes.libroIncorrecto);
        this.createCharacter(rnd);
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