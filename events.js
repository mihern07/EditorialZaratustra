import Personaje from "./character.js";
import { eventsConst } from "./constants.js";
import NewsCharacter from "./newsCharacter.js";

export default class Events extends Phaser.GameObjects.GameObject {
    constructor(scene, x, y, sprite, dialogueSprite, bookSprite1, bookSprite2, documentSprite, bookInfo, noticiaInfo,
        order, gameManager, day, month, year) {
        super(scene, x, y);

        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scene = scene;

        this.dialogosEvento = eventsConst.eventDialogue;
        this.dialogosLibro = eventsConst.bookDialogue;
        this.dialogosNoticias = eventsConst.newsDialogue;


        this.bookInfo = bookInfo;
        this.noticiaInfo = noticiaInfo;
        this.bookMalRadio = [];     //Rellenado por radio.js
        this.noticiaMalRadio = [];  //Rellenado por radio.js

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

        // Añade los minimos correctos
        for (let i = 0; i < this.order.numCorrects; i++) {
            if (this.noticiaInfo.noticiaBien.length == 0 || this.getRndInteger(0, 5) != 0)
                this.clientOrder.push(this.charaTypes.libroCorrecto);
            else
                this.clientOrder.push(this.charaTypes.noticiaCorrecta);
            cont++;
        }

        // Añade el resto (correctos o incorrectos)
        for (let i = cont; i < this.order.minBooks; i++) {
            if (this.noticiaInfo.noticiaBien.length == 0 || this.getRndInteger(0, 5) != 0)
                this.clientOrder.push(this.getRndInteger(this.charaTypes.libroCorrecto, this.charaTypes.libroIncorrecto));
            else
                this.clientOrder.push(this.getRndInteger(this.charaTypes.noticiaCorrecta, this.charaTypes.noticiaIncorrecta));
        }

        // Añadimos los personajes de evento
        if (this.order.specialChara[0] == this.charaTypes.correos || this.order.specialChara[0] == this.charaTypes.mujerDelJefe) { // si es correos o mujer del jefe
            let randomSpecial = this.getRndInteger(0, 1);
            this.clientOrder.push(this.order.specialChara[randomSpecial]);
        }
        else {
            for (let i = 0; i < this.order.specialChara.length; i++) {
                this.clientOrder.push(this.order.specialChara[i]);
            }
        }

        this.clientOrder = this.clientOrder.sort(() => Math.random() - 0.5); // Mezcla elementos de la array (https://flaviocopes.com/how-to-shuffle-array-javascript/)

        this.day = day;
        this.month = month;
        this.year = year;

        console.log(this.clientOrder);
        //Crea el primer personaje
        this.setChara();
    }

    //Creamos al character
    createCharacter(tipo) {
        this.isCharaInScene = true;
        switch (tipo) {
            case this.charaTypes.ninio:
                //Niño
                let dialogoNinio = this.splitDialogue(this.dialogosEvento[0]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "boy", dialogoNinio, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.sobornador:
                //Sobornador
                let dialogoSobornador = this.splitDialogue(this.dialogosEvento[4]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "sobornador", dialogoSobornador, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.vagabundo:
                //Vagabundo
                let dialogoVagabundo = this.splitDialogue(this.dialogosEvento[5]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "vagabundo", dialogoVagabundo, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.correos:
                //Correos
                let dialogoCorreos = this.splitDialogue(this.dialogosEvento[2]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "cartero", dialogoCorreos, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.correosFalso:
                //Correos falso
                let dialogoCorreosFalso = this.splitDialogue(this.dialogosEvento[7]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "cartero", dialogoCorreosFalso, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.mujerDelJefe:
                //Mujer del jefe
                let dialogueMujerDelJefe = this.splitDialogue(this.dialogosEvento[3]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "bossWife", dialogueMujerDelJefe, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.mujerDelJefeFalsa:
                //Mujer del jefe falsa
                let dialogueMujerDelJefeFalsa = this.splitDialogue(this.dialogosEvento[6]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "bossWife", dialogueMujerDelJefeFalsa, this.dialogueSprite, this.documentSprite);
                break;
            case this.charaTypes.tendencias:
                //Personaje tendencias
                let dialogueTendencias = this.splitDialogue(this.dialogosEvento[1]);
                this.chara = new Personaje(this.scene, this.x, this.y, false, "tend", dialogueTendencias, this.dialogueSprite, this.documentSprite);
                //this.chara = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.documentSprite, this.bookSprite1, this.bookSprite2);
                break;
            case this.charaTypes.libroCorrecto:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                this.createCorrectBook();
                this.dialogoLibro = this.splitDialogue(this.dialogosLibro[this.getRndInteger(0, this.dialogosLibro.length - 1)]);
                this.chara = new Personaje(this.scene, this.x, this.y, true, this.chooseSprites(), this.dialogoLibro, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPags);
                break;
            case this.charaTypes.libroIncorrecto:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                this.createIncorrectChara();
                break;
            case this.charaTypes.noticiaCorrecta:
                //Personaje noticia correcta
                console.log("Personaje noticia correcta");
                this.news = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
                this.dialogoNoticia = this.splitDialogue(this.dialogosNoticias[this.getRndInteger(0, this.dialogosNoticias.length - 1)]);
                this.chara = new NewsCharacter(this.scene, this.x, this.y, this.chooseSprites(), this.dialogoNoticia, this.day, this.month, this.year, this.news);
                break;
            case this.charaTypes.noticiaIncorrecta:
                //Personaje noticia incorrecta
                console.log("Personaje noticia incorrecta");

                if (this.getRndInteger(0, 1) == 0) { //Fecha Mal
                    this.incorrectDay = this.getRndInteger(1, 30);
                    this.incorrectMonth = this.getRndInteger(1, 12);
                    this.incorrectYear = this.getRndInteger(1960, 2040);
                    while (this.incorrectDay == this.day && this.incorrectMonth == this.month && this.incorrectYear == year) {
                        this.incorrectDay = this.getRndInteger(1, 30);
                        this.incorrectMonth = this.getRndInteger(1, 12);
                        this.incorrectYear = this.getRndInteger(1960, 2040);
                    }
                    this.news = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
                    this.dialogoNoticia = this.splitDialogue(this.dialogosNoticias[this.getRndInteger(0, this.dialogosNoticias.length - 1)]);
                    this.chara = new NewsCharacter(this.scene, this.x, this.y, this.chooseSprites(), this.dialogoNoticia, this.incorrectDay, this.incorrectMonth, this.incorrectYear, this.news);
                }
                else {  //Noticia Mal
                    this.news = this.noticiaInfo.noticiaMal[this.getRndInteger(0, this.noticiaInfo.noticiaMal.length - 1)];
                    this.dialogoNoticia = this.splitDialogue(this.dialogosNoticias[this.getRndInteger(0, this.dialogosNoticias.length - 1)]);
                    this.chara = new NewsCharacter(this.scene, this.x, this.y, this.chooseSprites(), this.dialogoNoticia, this.day, this.month, this.year, this.news);
                }


                break;

            default:
                this.isCharaInScene = false;
                console.log("El personaje buscado no existe");
                break;
        }
    }

    //Se elige al azar el cuerpo del character
    chooseSprites() {
        this.value = this.getRndInteger(0, 6);
        switch (this.value) //PELO DEL CHARACTER
        {
            case 0:
                this.sprite = "clothes1";
                break;
            case 1:
                this.sprite = "clothes2";
                break;
            case 2:
                this.sprite = "clothes3";
                break;
            case 3:
                this.sprite = "clothes4";
                break;
            case 4:
                this.sprite = "clothes5";
                break;
            case 5:
                this.sprite = "clothes6";
                break;
            case 6:
                this.sprite = "clothes7";
                break;
        }
        return this.sprite;
    }

    //Dividimos el diálogo
    splitDialogue(dialogue) {
        this.dialogoAPartir = this.scene.cache.text.get(dialogue);
        this.dialogoAPartir = this.dialogoAPartir.split("\n");
        return this.dialogoAPartir;
    }

    update() {
        //Si el character se ha ido, se destruye libro, sprites y documento
        if (this.chara.checkGone()) {
            this.chara.document.destroy();
            if (this.chara.hasBook)
                this.chara.book.destroy();
            if (this.chara.head != null) {
                this.chara.head.destroy();
                this.chara.hair.destroy();
            }
            this.chara.destroy();
            this.isCharaInScene = false;
            if (this.contKnownCharas < this.clientOrder.length) { //Creación de nuevo personaje
                this.setChara();
            }
            else {
                this.setRandomChara();
            }
        }
        this.charaShowBook();
    }

    //Character muestra el libro
    charaShowBook() {
        if (this.chara.currentS === this.chara.States.SHOW) {
            this.chara.showBook();
        }
    }

    //Character entra
    enterChar() {
        this.chara.enterChar();
    }

    //Character es denegado
    denyChar() {
        this.chara.denyChar();
        this.charaOutcome(false);
    }

    //Character es aceptado
    acceptChar() {
        this.chara.acceptChar();
        this.charaOutcome(true);
    }

    //Crea el siguiente character en la lista de necesarios
    setChara() {
        this.currentCharaType = this.clientOrder[this.contKnownCharas];
        this.createCharacter(this.currentCharaType);
        this.contKnownCharas++;
    }

    //Crea un character aleatorio entre correcto e incorrecto
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

    //Crea un character incorrecto
    createIncorrectChara() {
        this.createCorrectBook(); // Crea un libro correcto
        let wrongAspect;
        if (this.bookInfo.numPagsMal.length == 0)
            wrongAspect = this.getRndInteger(0, 1); // Selecciona el aspecto que será erróneo
        else
            wrongAspect = this.getRndInteger(0, 2);
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
                this.dialogoLibro = this.splitDialogue(this.dialogosLibro[this.getRndInteger(0, this.dialogosLibro.length - 1)]);
                this.chara = new Personaje(this.scene, this.x, this.y, true, this.chooseSprites(), this.dialogoLibro, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPags);
                break;
            case 1:
                //Sprite Incorrecto
                do {
                    this.wrongSprite = this.bookInfo.everyCategory[this.getRndInteger(0, this.bookInfo.everyCategory.length - 1)];
                } while (this.wrongSprite == this.category);

                this.dialogoLibro = this.splitDialogue(this.dialogosLibro[this.getRndInteger(0, this.dialogosLibro.length - 1)]);
                this.chara = new Personaje(this.scene, this.x, this.y, true, this.chooseSprites(), this.dialogoLibro, this.dialogueSprite, this.documentSprite, "libroC" + this.wrongSprite, "libroA" + this.wrongSprite, this.genre, this.category, this.tamPags);
                break;
            case 2:
                //Número de páginas Incorrecto
                this.tamPags = this.bookInfo.numPagsMal[this.getRndInteger(0, this.bookInfo.numPagsMal.length - 1)];
                this.dialogoLibro = this.splitDialogue(this.dialogosLibro[this.getRndInteger(0, this.dialogosLibro.length - 1)]);
                this.chara = new Personaje(this.scene, this.x, this.y, true, this.chooseSprites(), this.dialogoLibro, this.dialogueSprite, this.documentSprite, "libroC" + this.category, "libroA" + this.category, this.genre, this.category, this.tamPags);
                break;
        }
    }

    //Gestiona qué sucede si se acepta o deniega cada tipo de personaje
    charaOutcome(accepted) {
        switch (this.currentCharaType) {
            case this.charaTypes.ninio:
                //Niño
                if (accepted) {
                    this.gameManager.addSubstractMoney(eventsConst.childMoneyAmount);
                    if (this.gameManager.strike(eventsConst.childProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.sobornador:
                //Sobornador
                if (accepted) {
                    this.gameManager.addSubstractMoney(eventsConst.briberyMoneyAmount);
                    if (this.gameManager.strike(eventsConst.briberyProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.vagabundo:
                //Vagabundo
                if (accepted) {
                    this.gameManager.addSubstractMoney(eventsConst.homelessMoneyAmount);
                    if (this.gameManager.strike(eventsConst.homelessProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.correos:
                //Correos
                if (accepted) {
                    this.gameManager.addSubstractMoney(eventsConst.deliveryMoneyAmount);
                }
                else {
                    if (this.gameManager.strike(eventsConst.deliveryProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.correosFalso:
                //Correos falso
                if (accepted) {
                    if (this.gameManager.strike(eventsConst.deliveryProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.mujerDelJefe:
                //Mujer del jefe
                if (accepted) {
                    this.gameManager.addSubstractMoney(eventsConst.wifeMoneyAmount);
                }
                else {
                    if (this.gameManager.strike(eventsConst.wifeProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.mujerDelJefeFalsa:
                //Mujer del jefe falsa
                if (accepted) {
                    if (this.gameManager.strike(eventsConst.wifeProbability))
                        this.scene.strikeShake();
                }
                break;
            case this.charaTypes.libroCorrecto:
                //Personaje libro correcto
                console.log("Personaje Correcto")
                if (accepted) {
                    if (this.isBookBanned(this.chara.getCategory())) {
                        this.gameManager.bookStrike();
                        this.scene.strikeShake();
                    } else {
                        this.gameManager.addSubstractMoney(eventsConst.moneyAmount);
                    }
                }
                break;
            case this.charaTypes.libroIncorrecto:
                //Personaje Libro Incorrecto
                console.log("Personaje Incorrecto")
                if (accepted) {
                    this.gameManager.bookStrike();
                    this.scene.strikeShake();
                }
                break;
            case this.charaTypes.noticiaCorrecta:
                //Personaje noticia correcta
                console.log("Noticia correcta");
                if (accepted) {
                    if (this.isNoticiaBanned(this.chara.getCategory())) {
                        this.gameManager.strike(eventsConst.newsProbability);
                        this.scene.strikeShake();
                    } else {
                        this.gameManager.addSubstractMoney(eventsConst.moneyAmount);
                    }
                }
                break;
            case this.charaTypes.noticiaIncorrecta:
                //Personaje noticia incorrecta
                console.log("Noticia incorrecta");
                if (accepted) {
                    this.gameManager.strike(eventsConst.newsProbability);
                    this.scene.strikeShake();
                }
                break;
        }
        console.log(this.gameManager.dinero);
        console.log(this.gameManager.strikes);
        console.log(this.gameManager.bookStrikeCont);
    }

    getBookMalRadio() {
        return this.bookMalRadio;
    }

    getNoticiaMalRadio() {
        return this.noticiaMalRadio;
    }

    //Se censura un libro
    addCensoredBook(aCensurar) {
        this.bookMalRadio.push(aCensurar);
        console.log(this.bookMalRadio);
    }

    //Se censura una noticia
    addCensoredNoticia(aCensurar) {
        this.noticiaMalRadio.push(aCensurar);
        console.log(this.noticiaMalRadio);
    }

    //Comprueba si "category" esta baneada (libro)
    isBookBanned(category) {
        if (this.bookMalRadio.length == 0)
            return false;
        let banned = false;
        let i = 0;
        while (i < this.bookMalRadio.length && category != this.bookMalRadio[i]) {
            i++;
        }
        if (i == this.bookMalRadio.length) {
            return false;
        } else {
            return true;
        }
    }

    //Comprueba si "category" esta baneada (noticia)
    isNoticiaBanned(category) {
        if (this.noticiaMalRadio.length == 0)
            return false;
        let banned = false;
        let i = 0;
        while (i < this.noticiaMalRadio.length && category != this.noticiaMalRadio[i]) {
            i++;
        }
        if (i == this.noticiaMalRadio.length) {
            return false;
        } else {
            return true;
        }
    }

    //El character se niega a irse
    refuseDenial() {
        this.chara.refuseDenial();
    }

    getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}