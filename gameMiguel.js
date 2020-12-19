import Clock from "./clock_class.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";
import Inkwell from "./inkwell_class.js";
import Board from "./board.js";
import Pen from "./pen.js";
import Events from "./events.js"
import Bodyguard from "./bodyguard.js"
import Alarm from "./alarm.js"
import GameManager from "./gameManager.js";

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: "main" });
  }

  create() {
    //GLOBAL
    this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.
    let pointer = this.input.activePointer; // Raton.
    //----Prueba de array de diálogos y enum guía
    // let dialogues = ["Dejame pasar, he perdido a mi padre"];
    // const dialoguesEnum = {
    //   PERDIDO = 0,
    // }
    //FONDO
    this.bg = this.add.sprite(550, 397, "background") // Los NPC's solo se ven por encima del bg

    //CLOCK
    this.clock = new Clock(this, 750, 55, "clock", "manecilla"); //Inicializa reloj
    this.clock.start(this.handleTimeFinished.bind(this), '180000');

    //Personaje
    let archivoDialogo = this.cache.text.get("ninio");
    archivoDialogo = archivoDialogo.split("\n");
    this.chara = new Character(this, 955, 380, "character", archivoDialogo, "box", "book", "book2", "document"); //Inicializa personaje

    //FOREGROUND(MESA)
    this.fg = this.add.sprite(550, 392, "foreground");

    //BOARD(CORCHO)
    this.Board = new Board(this, 965, 340, 13, "board", "postIt")

    //TINTEROS

    this.tinteroVerde = new Inkwell(this, 200, 600, "tinteroV"); //Inicializa tintero verde

    this.tinteroRojo = new Inkwell(this, 950, 600, "tinteroR"); //Inicializa tintero rojo

    //CALENDARIO
    this.calendar = this.add.sprite(100, 300, "calendarOriginal");
    this.calendar.setScale(0.45)

    //PLUMA

    this.pen = new Pen(this, 700, 700, "pen", "penR", "penV");

    //Preparación de los archivos de texto
    let dialogoJefe = this.cache.text.get("jefe");
    dialogoJefe = dialogoJefe.split("\n");
    let dialogoNinio = this.cache.text.get("ninio");
    dialogoNinio = dialogoNinio.split("\n");
    let dialogoTendencias = this.cache.text.get("tendencias");
    dialogoTendencias = dialogoTendencias.split("\n");
    let dialogoCorreos = this.cache.text.get("correos");
    dialogoCorreos = dialogoCorreos.split("\n");
    let dialogoCorreosFalso = this.cache.text.get("correosFalso");
    dialogoCorreosFalso = dialogoCorreosFalso.split("\n");
    let dialogoMujerDelJefe = this.cache.text.get("mujerDelJefe");
    dialogoMujerDelJefe = dialogoMujerDelJefe.split("\n");
    let dialogoMujerDelJefeFalsa = this.cache.text.get("mujerdelJefeFalsa");
    dialogoMujerDelJefeFalsa = dialogoMujerDelJefeFalsa.split("\n");
    let dialogoSobornador = this.cache.text.get("sobornador");
    dialogoSobornador = dialogoSobornador.split("\n");
    let dialogoVagabundo = this.cache.text.get("vagabundo");
    dialogoVagabundo = dialogoVagabundo.split("\n");
    let dialogoBase = this.cache.text.get("dialogoBase");
    dialogoBase = dialogoBase.split("\n");

    this.bg.setDepth(-2); //MOVER A FONDO Para que el fondo se dibuje detrás del todo

    //Info del libro
    this.bookInfo = {
      novelaBien: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
      poesiaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
      teatroBien: ["Romance", "Aventura", "Suspense", "Histórico"],
      novelaMal: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
      poesiaMal: [],
      teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
      everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
      numPagsBien: [0, 2],
      numPagsMal: [1]
    }

    this.events = new Events(this, 955, 380, "character", dialogoJefe, dialogoNinio, dialogoTendencias,
      dialogoCorreos, dialogoCorreosFalso, dialogoMujerDelJefe, dialogoMujerDelJefeFalsa,
      dialogoSobornador, dialogoVagabundo, dialogoBase, "box", "book", "book2", "document", this.bookInfo);

    //DESKBELL
    this.bellSound = this.sound.add("deskbellSound");
    this.bell = new DeskBell(this, 825, 500, "deskBellSP", "deskBellPressed", this.events, this.bellSound); //Inicializa timbre

     //SEGURIDAD

     this.bodyguard = new Bodyguard(this,955,340,"bodyguard", this.events) //Inicializa bodyguard

     //ALARMA
 
     this.alarm = new Alarm(this,200,800,"deskBellSP", "deskBellPressed", this.bodyguard); //Inicializa alarma.
 
     this.Intro();

     this.gameManager = new GameManager();
  }

  handleTimeFinished() {
    if(this.gameManager.isCleared(1500))
      this.scene.start('victoryScene', this.gameManager)
    else
      this.scene.start('gameOverScene', this.gameManager);
  }



  update(time, delta) {
    if (this.physics.overlap(this.pen, this.tinteroRojo)) { //Overlap Rojo
      console.log("Hay solapeR");
      this.pen.setRed();
    }

    if (this.physics.overlap(this.pen, this.tinteroVerde)) { //Overlap Verde
      console.log("Hay solapeV");
      this.pen.setGreen();
    }

    this.pen.changeColor();

    this.pen.PenR.on("pointerup", pointer => {
      if (this.physics.overlap(this.pen, this.chara.document)) { //Overlap Documento Pluma Roja
        this.events.DenyChar();
        this.pen.setNormal();
        console.log("Hay solapeD Deny");
      }
    })

    this.pen.PenV.on("pointerup", pointer => {
      if (this.physics.overlap(this.pen, this.chara.document)) { //Overlap Documento Pluma Verde
        this.events.AcceptChar();
        this.pen.setNormal();
        console.log("Hay solapeD Accept");
      }
    })
  }

  Intro() {
    this.cameras.main.fadeIn(2000, 0, 0, 0);
    //this.createParticles("paperParticle");
  }

  createParticles(particleSprite) {
    //Particles
    let leaves = this.add.particles(particleSprite);
    leaves.createEmitter({
      frames: [{ key: particleSprite, frame: 0 }],
      x: { min: 100, max: this.game.config.width },
      y: -50,
      speedX: { min: -50, max: 50 },
      speedY: { min: 100, max: 120 },
      lifespan: 7000,
      scale: { start: 0.1, end: 0.01 },
      rotate: { start: 0, end: 120 },
      frequency: 300
    });
  }

}