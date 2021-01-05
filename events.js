import Personaje from "./character.js";
import { eventsConst } from "./constants.js";
import NewsCharacter from "./newsCharacter.js";
import Newspaper from "./newspaper.js";
import Radio from "./radio.js";

export default class Events extends Phaser.GameObjects.GameObject {
    constructor(scene, x, y, sprite, dialogueJefe, dialogueNinio, dialogueTendencias, dialogueCorreos, dialogueCorreosFalso, dialogueMujerDelJefe,
        dialogueMujerDelJefeFalsa, dialogueSobornador, dialogueVagabundo, dialogueBase, dialogueSprite, bookSprite1, bookSprite2, documentSprite, bookInfo, noticiaInfo,
        order, gameManager, day, month, year) {
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
        this.noticiaInfo = noticiaInfo;

        this.dialogueSprite = dialogueSprite;
        this.bookSprite1 = bookSprite1;
        this.bookSprite2 = bookSprite2;
        this.documentSprite = documentSprite;
        this.order = order;
        this.gameManager = gameManager;
        this.contKnownCharas = 0;

        //Enum con todos los tipos distintos de personaje
        this.charaTypes = {
            ninio: 0, sobornador: 1, vagabundo: 2, correos: 3, correosFalso: 4, mujerDelJefe: 5,
            mujerDelJefeFalsa: 6, tendencias: 7, libroCorrecto: 8, libroIncorrecto: 9, noticiaCorrecta: 10, noticiaIncorrecta: 11
        };

        let cont = 0;
        this.clientOrder = [];
        for (let i = 0; i < this.order.numCorrects; i++) { // Añade los minimos correctos
            if (this.getRndInteger(0,1) == 0)
                this.clientOrder.push(this.charaTypes.libroCorrecto);
            else
                this.clientOrder.push(this.charaTypes.noticiaCorrecta);
            cont++;
        }
        for (let i = cont; i < this.order.minBooks; i++) { // Añade el resto (correctos o incorrectos)
            if (this.getRndInteger(0,1) == 0)
                this.clientOrder.push(this.getRndInteger(this.charaTypes.libroCorrecto, this.charaTypes.libroIncorrecto));
            else
                this.clientOrder.push(this.getRndInteger(this.charaTypes.noticiaCorrecta, this.charaTypes.noticiaIncorrecta));
        }
        for (let i = 0; i < this.order.specialChara.length; i++) { // Añade los personajes de evento
            this.clientOrder.push(this.order.specialChara[i]);
        }
        this.clientOrder = this.clientOrder.sort(() => Math.random() - 0.5); // Mezcla elementos de la array (https://flaviocopes.com/how-to-shuffle-array-javascript/)

        this.day = day;
        this.month = month;
        this.year = year;

        this.radio = new Radio(this.scene, 250, 520, "radio", this);

        console.log(this.clientOrder);
        //Crea el primer personaje
        this.setChara();
    }

    createCharacter(tipo) {
        this.isCharaInScene = true;
        switch (tipo) {
            case this.charaTypes.ninio:
                //Niño
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueNinio, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.sobornador:
                //Sobornador
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueSobornador, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.vagabundo:
                //Vagabundo
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.correos:
                //Correos
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreos, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.correosFalso:
                //Correos falso
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreosFalso, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.mujerDelJefe:
                //Mujer del jefe
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefe, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.mujerDelJefeFalsa:
                //Mujer del jefe falsa
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefeFalsa, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.tendencias:
                //Personaje tendencias
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueTendencias, this.dialogueSprite, this.documentSprite);
                //this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.documentSprite, this.bookSprite1, this.bookSprite2);
                break;
            case this.charaTypes.libroCorrecto:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                this.createCorrectBook();
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPagsdocumentSprite);
                break;
            case this.charaTypes.libroIncorrecto:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                this.createIncorrectChara();
                break;
            case this.charaTypes.noticiaCorrecta:
                console.log("Personaje noticia correcta");
                this.news = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
                this.chara = new NewsCharacter(this.scene, this.x, this.y, this.sprite, this.day, this.month, this.year, this.news);
                break;
            case this.charaTypes.noticiaIncorrecta:
                console.log("Personaje noticia incorrecta");
    
                if(this.getRndInteger(0, 1) == 0){
                    this.incorrectDay = this.getRndInteger(1, 30);
                    this.incorrectMonth = this.getRndInteger(1, 12);
                    this.incorrectYear = this.getRndInteger(1960, 2040);
                    while (this.incorrectDay == this.day && this.incorrectMonth == this.month && this.incorrectYear == year) {
                    this.incorrectDay = this.getRndInteger(1, 30);
                    this.incorrectMonth = this.getRndInteger(1, 12);
                    this.incorrectYear = this.getRndInteger(1960, 2040);
                    }
                    this.news = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
                    this.chara = new NewsCharacter(this.scene, this.x, this.y, this.sprite, this.incorrectDay, this.incorrectMonth, this.incorrectYear, this.news);
                }
                else{
                    this.news = this.noticiaInfo.noticiaMal[this.getRndInteger(0, this.noticiaInfo.noticiaMal.length - 1)];
                    this.chara = new NewsCharacter(this.scene, this.x, this.y, this.sprite, this.day, this.month, this.year, this.news);
                }
                    
                    
                break;
            
            default:
                this.isCharaInScene = false;
                console.log("El personaje buscado no existe");
                break;
        }
    }

    update() {
        if (this.chara.checkGone()) {
            this.chara.document.destroy();
            if (this.chara.hasBook)
                this.chara.book.destroy();
            this.chara.destroy();
            this.isCharaInScene = false;
            if (this.contKnownCharas < this.clientOrder.length) { // creación de nuevo personaje
                this.setChara();
            }
            else {
                this.setRandomChara();
            }
        }
        this.charaShowBook();
    }

    charaShowBook() {
        if (this.chara.currentS === this.chara.States.SHOW) {
            this.chara.ShowBook();
            //this.chara.ShowDocument();
        }
    }

    // personaje entra
    EnterChar() {
        this.chara.EnterChar();
    }

    // personaje es denegado
    DenyChar() {
        this.chara.DenyChar();
        this.charaOutcome(false);
    }

    // personaje es aceptado
    AcceptChar() {
        this.chara.AcceptChar();
        this.charaOutcome(true);
    }

    // Crea el siguiente personaje en la lista de necesarios
    setChara() {
        this.currentCharaType = this.clientOrder[this.contKnownCharas];
        this.createCharacter(this.currentCharaType);
        this.contKnownCharas++;
    }

    // Crea un personaje aleatorio entre correcto e incorrecto
    setRandomChara() {
        this.currentCharaType = this.getRndInteger(this.charaTypes.libroCorrecto, this.charaTypes.libroIncorrecto);
        this.createCharacter(this.currentCharaType);
    }

    //Crea un libro con todos los parámetros correctos
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
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPags);
                break;
            case 1:
                //Número de páginas Incorrecto
                this.tamPags = this.bookInfo.numPagsMal[this.getRndInteger(0, this.bookInfo.numPagsMal.length - 1)];
                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPags);
                break;
            case 2:
                //Sprite Incorrecto
                do {
                    this.wrongSprite = this.bookInfo.everyCategory[this.getRndInteger(0, this.bookInfo.everyCategory.length - 1)];
                } while (this.wrongSprite == this.category);

                this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueBase, this.dialogueSprite, this.documentSprite, "libroC" + this.wrongSprite, "libroA" + this.wrongSprite, this.genre, this.category, this.tamPags);
                break;
        }
    }

    //Gestiona qué sucede si se acepta o deniega cada tipo de personaje
    charaOutcome(accepted) {
        switch (this.currentCharaType) {
            case this.charaTypes.ninio:
                //Niño
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.childMoneyAmount);
                    this.gameManager.Strike(eventsConst.childProbability);
                }
                break;
            case this.charaTypes.sobornador:
                //Sobornador
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.briberyMoneyAmount);
                    this.gameManager.Strike(eventsConst.briberyProbability);
                }
                break;
            case this.charaTypes.vagabundo:
                //Vagabundo
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.homelessMoneyAmount);
                    this.gameManager.Strike(eventsConst.homelessProbability);
                }
                break;
            case this.charaTypes.correos:
                //Correos
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.deliveryMoneyAmount);
                }
                else {
                    this.gameManager.Strike(eventsConst.deliveryProbability);
                }
                break;
            case this.charaTypes.correosFalso:
                //Correos falso
                if (accepted) {
                    this.gameManager.Strike(eventsConst.deliveryProbability);
                }
                break;
            case this.charaTypes.mujerDelJefe:
                //Mujer del jefe
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.wifeMoneyAmount);
                }
                else {
                    this.gameManager.Strike(eventsConst.wifeProbability);
                }
                break;
            case this.charaTypes.mujerDelJefeFalsa:
                //Mujer del jefe falsa
                if (accepted) {
                    this.gameManager.Strike(eventsConst.wifeProbability);
                }
                break;
            case this.charaTypes.libroCorrecto:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                if (accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.moneyAmount);
                }
                break;
            case this.charaTypes.libroIncorrecto:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                if (accepted) {
                    this.gameManager.BookStrike();
                }
                break;
            case this.charaTypes.noticiaCorrecta:
                //Personaje noticia correcta
                console.log("Noticia correcta");
                if(accepted) {
                    this.gameManager.AddSubstractMoney(eventsConst.moneyAmount);
                }
            case this.charaTypes.noticiaIncorrecta:
                //Personaje noticia incorrecta
                console.log("Noticia incorrecta");
                if (accepted) {
                    this.gameManager.BookStrike();
                }
                break;
        }
        console.log(this.gameManager.dinero);
        console.log(this.gameManager.strikes);
        console.log(this.gameManager.bookStrikeCont);
    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}