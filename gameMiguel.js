import Clock from "./Clock.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";
import Inkwell from "./Inkwell.js";
import Board from "./board.js";
import Pen from "./pen.js";
import Events from "./events.js"

export default class Game extends Phaser.Scene {

    constructor() {
      super({ key: "main" });
    }
    preload() { //Carga de sprites
      this.load.image("background", "sprites/Background.png") //Fondo = background
      this.load.image("foreground", "sprites/Foreground.png") //Mesa = foreground
      this.load.image("book","sprites/LibroCerrado.png"); //Libro cerrado = book
      this.load.image("book2","sprites/LibroAbierto.png"); //libro abierto = book2
      this.load.image("clock","sprites/clockPrototype.png"); //Reloj = clock
      this.load.image("manecilla","sprites/manecilla.png"); //Manecilla = manecilla
      this.load.image("box", "sprites/dialogueBoxv2.0.png"); //Bocadillo = box
      this.load.image("character", "sprites/Personaje.png"); //personaje = character
      this.load.image("deskBellPressed","sprites/TimbrePulsado.png"); //timbre pulsado = deskBellPressed
      this.load.spritesheet("deskBellSP","sprites/TimbreSheet.png", { frameWidth: 385, frameHeight: 356 }); //timbre = deskBellSP
      this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
      this.load.image("tinteroR", "sprites/tinteroRojo.png"); // tintero rojo = tinteroR
      this.load.image("document", "sprites/Documento.png");
      this.load.image("pen", "sprites/Pen.png");
      this.load.image("penV", "sprites/PenGreen.png");
      this.load.image("penR", "sprites/PenRed.png");
      this.load.image("board", "sprites/Board.png"); // Board
      this.load.image("postIt", "sprites/PostItBlanco.png"); // PostIt
      this.load.image("calendarOriginal", "sprites/calendar31_04.png");
      this.load.image("paperParticle", "sprites/paperParticle.png");

      this.load.text("jefe", "dialogue/jefe.txt");
      this.load.text("ninio", "dialogue/Ninio.txt");
      this.load.text("tendencias", "dialogue/personaje_tendencias.txt");
      this.load.text("correos", "dialogue/correos.txt");
      this.load.text("correosFalso", "dialogue/correos.txt");
      this.load.text("mujerDelJefe", "dialogue/mujer_del_jefe.txt");
      this.load.text("mujerdelJefeFalsa", "dialogue/mujer_del_jefe.txt");
      this.load.text("sobornador", "dialogue/sobornador.txt");
      this.load.text("vagabundo", "dialogue/vagabundo.txt");
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
      this.bg = this.add.sprite(550,397,"background") // Los NPC's solo se ven por encima del bg

      //CLOCK
      this.clock = new Clock(this, 750, 55, "clock", "manecilla"); //Inicializa reloj
      this.clock.start(this.handleTimeFinished.bind(this), '180000');

      //Personaje
      let archivoDialogo = this.cache.text.get("ninio");
      archivoDialogo = archivoDialogo.split("\n");
      this.chara  = new Character(this,955,380,"character", archivoDialogo, "box", "book", "book2","document"); //Inicializa personaje

      //FOREGROUND(MESA)
      this.fg = this.add.sprite(550,392,"foreground"); 

      //BOARD(CORCHO)
      this.Board = new Board(this, 965,340,13,"board", "postIt") 

      //DESKBELL
  
      this.bell  = new DeskBell(this,825,500,"deskBellSP", "deskBellPressed"); //Inicializa timbre

      //TINTEROS

      this.tinteroVerde = new Inkwell(this,200,600,"tinteroV"); //Inicializa tintero verde

      this.tinteroRojo = new Inkwell(this,300,600,"tinteroR"); //Inicializa tintero rojo

      //CALENDARIO
      this.calendar = this.add.sprite(100, 300, "calendarOriginal");
      this.calendar.setScale(0.45)

      //PLUMA

      this.pen = new Pen(this,700,600,"pen");

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
      this.events  = new Events(this,955,380,"character", dialogoJefe, dialogoNinio, dialogoTendencias,
      dialogoCorreos, dialogoCorreosFalso, dialogoMujerDelJefe, dialogoMujerDelJefeFalsa,
      dialogoSobornador, dialogoVagabundo, "box", "book", "book2","document");

      this.Intro();
    }

    handleTimeFinished(){
        this.scene.start('Level2');
    }


  
    update(time, delta) {
        this.clock.update();
        //this.chara.quetemuevas();

        if (this.bell.clicked){ //Timbre
          this.events.EnterChar();
        }

        this.events.CharaShowBook();

        if(this.tinteroRojo.clicked) //Boton de alarma
        {
          this.events.DenyChar();
        }

        if(this.tinteroVerde.clicked) //Boton de alarma
        {
          this.events.AcceptChar();
        }
    }


    Intro(){
      this.cameras.main.fadeIn(2000, 0, 0, 0);
      //this.createParticles("paperParticle");
    }

    createParticles(particleSprite)
    {
      //Particles
      let leaves = this.add.particles(particleSprite);
      leaves.createEmitter({
          frames: [{key: particleSprite, frame: 0}],
          x: { min: 100, max: this.game.config.width},
          y: -50,
          speedX: { min: -50, max: 50 },
          speedY: { min: 100, max: 120 },
          lifespan: 7000,
          scale: {start: 0.1, end: 0.01},
          rotate: {start: 0, end: 120},
          frequency: 300
      });
    }
  
  }