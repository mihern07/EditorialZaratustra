import Clock from "./clock.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";
import Inkwell from "./inkwell.js";
import Board from "./board.js";
import Pen from "./pen.js";
import Events from "./events.js"
import Bodyguard from "./bodyguard.js"
import Alarm from "./alarm.js"

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: "main" });
  }
  preload() { //Carga de sprites
    this.load.image("background", "sprites/background.png") //Fondo = background
    this.load.image("foreground", "sprites/foreground.png") //Mesa = foreground
    this.load.image("book", "sprites/librocerrado.png"); //Libro cerrado = book
    this.load.image("book2", "sprites/libroabierto.png"); //libro abierto = book2
    this.load.image("clock", "sprites/clockprototype.png"); //Reloj = clock
    this.load.image("manecilla", "sprites/manecilla.png"); //Manecilla = manecilla
    this.load.image("box", "sprites/dialogueboxv2.0.png"); //Bocadillo = box
    this.load.image("character", "sprites/personaje.png"); //personaje = character
    this.load.image("deskBellPressed", "sprites/timbrepulsado.png"); //timbre pulsado = deskBellPressed
    this.load.spritesheet("deskBellSP", "sprites/timbresheet.png", { frameWidth: 385, frameHeight: 356 }); //timbre = deskBellSP
    this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
    this.load.image("tinteroR", "sprites/tinteroRojo.png"); // tintero rojo = tinteroR
    this.load.image("document", "sprites/documento.png");
    this.load.image("pen", "sprites/pen.png");
    this.load.image("penV", "sprites/penGreen.png");
    this.load.image("penR", "sprites/penRed.png");
    this.load.image("board", "sprites/board.png"); // Board
    this.load.image("postIt", "sprites/postitBlanco.png"); // PostIt
    this.load.image("calendarOriginal", "sprites/calendar31_04.png");
    this.load.image("paperParticle", "sprites/paperParticle.png");
    this.load.image("bodyguard", "sprites/guardaespaldas.png"); //Guardaespaldas = bodyguard

    this.load.text("jefe", "dialogue/jefe.txt");
    this.load.text("ninio", "dialogue/ninio.txt");
    this.load.text("tendencias", "dialogue/personaje_tendencias.txt");
    this.load.text("correos", "dialogue/correos.txt");
    this.load.text("correosFalso", "dialogue/correos.txt");
    this.load.text("mujerDelJefe", "dialogue/mujer_del_jefe.txt");
    this.load.text("mujerdelJefeFalsa", "dialogue/mujer_del_jefe.txt");
    this.load.text("sobornador", "dialogue/sobornador.txt");
    this.load.text("vagabundo", "dialogue/vagabundo.txt");

    this.load.audio("deskbellSound", "sounds/deskbell.wav"); //Audio timbre
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

    this.pen = new Pen(this,700,700,"pen", "penR","penV");

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

    this.bg.setDepth(-2); //MOVER A FONDO Para que el fondo se dibuje detrás del todo

    //Inicializa los eventos
    this.events = new Events(this, 955, 380, "character", dialogoJefe, dialogoNinio, dialogoTendencias,
      dialogoCorreos, dialogoCorreosFalso, dialogoMujerDelJefe, dialogoMujerDelJefeFalsa,
      dialogoSobornador, dialogoVagabundo, "box", "book", "book2", "document");

    //DESKBELL
    this.bellSound = this.sound.add("deskbellSound");
    this.bell = new DeskBell(this, 825, 500, "deskBellSP", "deskBellPressed", this.events, this.bellSound); //Inicializa timbre

    //SEGURIDAD

    this.bodyguard = new Bodyguard(this,955,340,"bodyguard", this.events) //Inicializa bodyguard

    //ALARMA

    this.alarm = new Alarm(this,200,800,"deskBellSP", "deskBellPressed", this.bodyguard); //Inicializa alarma.

    this.Intro();
  }

  handleTimeFinished() {
    this.scene.start('level2');
  }



  update(time, delta) {
    if(this.physics.overlap(this.pen, this.tinteroRojo)) { //Overlap Rojo
      console.log("Hay solapeR");
      this.pen.setRed();
    }

    if(this.physics.overlap(this.pen, this.tinteroVerde)) { //Overlap Verde
      console.log("Hay solapeV");
      this.pen.setGreen();
    }

    this.pen.changeColor();

    this.pen.PenR.on("pointerup", pointer => {
      if(this.physics.overlap(this.pen, this.chara.document)) { //Overlap Documento Pluma Roja
        this.events.DenyChar();
        this.pen.setNormal();
        console.log("Hay solapeD Deny");
      }
    })   
  
    this.pen.PenV.on("pointerup", pointer => {
      if(this.physics.overlap(this.pen, this.chara.document)) { //Overlap Documento Pluma Verde
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