import Personaje from "./character.js";

export default class Character extends Phaser.GameObjects.GameObject{

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

    constructor(scene,x,y, sprite, dialogueNinio, dialogueTendencias, dialogueCorreos, dialogueCorreosFalso, dialogueMujerDelJefe,
        dialogueMujerDelJefeFalsa, dialogueSobornador, dialogueVagabundo, dialogueSprite, bookSprite1, bookSprite2, documentSprite){
        super(scene,x,y);

        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scene = scene;

        //Diálogos
        this.dialogueNinio = dialogueNinio;
        this.dialogueTendencias = dialogueTendencias;
        this.dialogueCorreos = dialogueCorreos;
        this.dialogueCorreosFalso = dialogueCorreosFalso;
        this.dialogueMujerDelJefe = dialogueMujerDelJefe;
        this.dialogueMujerDelJefeFalsa = dialogueMujerDelJefeFalsa;
        this.dialogueSobornador = dialogueSobornador;
        this.dialogueVagabundo = dialogueVagabundo;


        this.dialogueSprite = dialogueSprite;
        this.bookSprite1 = bookSprite1;
        this.bookSprite2 = bookSprite2;
        this.documentSprite = documentSprite;

        //Enum con todos los tipos distintos de personaje
        this.enum = {normal: 0, ninio: 1, tendencias: 2, correos: 3, correosFalso: 4, mujerDelJefe: 5, mujerDelJefeFalsa: 6, sobornador: 7, vagabundo: 8};

        this.currentCharacterType = this.enum.vagabundo;    //Determina el tipo de personaje que hay actualmente

        this.createCharacter(this.currentCharacterType);

        this.chara.setDepth(-1);    //MOVER ESTO A CHARACTER
    }

    createCharacter(tipo){
        switch (tipo){
            case 0:
                //Personaje normal
                //Crear personaje normal sin diálogo (Quizás tendremos que mover los diálogos al Events o añadir un booleano a character)
                break;
            case 1:
                //Niño
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueNinio, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 2:
                //Personaje tendencias
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueTendencias, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 3:
                //Correos
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreos, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 4:
                //Correos falso
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueCorreosFalso, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 5:
                //Mujer del jefe
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefe, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 6:
                //Mujer del jefe falsa
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueMujerDelJefeFalsa, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 7:
                //Sobornador
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueSobornador, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            case 8:
                //Vagabundo
                this.chara  = new Personaje(this.scene, this.x, this.y, this.sprite, this.dialogueVagabundo, this.dialogueSprite, this.bookSprite1, this.bookSprite2, this.documentSprite);
                break;
            default:
                console.log("El personaje buscado no existe");
                break;
        }
    }

    CharaShowBook(){
        if (this.chara.currentS === this.chara.States.SHOW){
            this.chara.ShowBook();
            this.chara.ShowDocument();
        }
    }

    EnterChar(){
        this.chara.EnterChar();
    }

    DenyChar(){
        this.chara.DenyChar();
    }

    AcceptChar(){
        this.chara.AcceptChar();
    }
}