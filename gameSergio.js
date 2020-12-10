import Book from "./book.js";
import Clock from "./clock.js";
import Dialogue from "./dialogue.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";
import Inkwell from "./inkwell.js";
import Document from "./document.js";
import Board from "./board.js";

export default class Game extends Phaser.Scene {

    constructor() {
      super({ key: "main" });
    }
    preload() { //Carga de sprites
      this.load.image("background", "sprites/background.png") //Fondo = background
      this.load.image("foreground", "sprites/foreground.png") //Mesa = foreground
      this.load.image("book","sprites/librocerrado.png"); //Libro cerrado = book
      this.load.image("book2","sprites/libroabierto.png"); //libro abierto = book2
      this.load.image("clock","sprites/clockprototype.png"); //Reloj = clock
      this.load.image("manecilla","sprites/manecilla.png"); //Manecilla = manecilla
      this.load.image("box", "sprites/dialogueboxv2.0.png"); //Bocadillo = box
      this.load.image("character", "sprites/personaje.png"); //personaje = character
      this.load.image("deskBellPressed","sprites/timbrepulsado.png"); //timbre pulsado = deskBellPressed
      this.load.spritesheet("deskBellSP","sprites/timbresheet.png", { frameWidth: 385, frameHeight: 356 }); //timbre = deskBellSP
      this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
      this.load.image("tinteroR", "sprites/tinterorojo.png"); // tintero rojo = tinteroR
      this.load.text("ninio", "dialogue/ninio.txt");
      this.load.image("document", "sprites/documento.png");
      this.load.image("pen", "sprites/pen.png");
      this.load.image("penV", "sprites/pengreen.png");
      this.load.image("penR", "sprites/penred.png");
      this.load.image("board", "sprites/board.png"); // Board
      this.load.image("postIt", "sprites/postitblanco.png"); // PostIt
      this.load.image("calendarOriginal", "sprites/calendar31_04.png");
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
      this.chara  = new Character(this,955,380,"character", archivoDialogo, "box") //Inicializa personaje

      this.fg = this.add.sprite(550,392,"foreground") 

      this.Board = new Board(this, 965,340,13,"board", "postIt") 
      
      //DESKBELL
  
      this.bell  = new DeskBell(this,825,500,"deskBellSP", "deskBellPressed") //Inicializa timbre

      //TINTEROS

      this.tinteroVerde = new Inkwell(this,200,600,"tinteroV") //Inicializa tintero verde

      this.tinteroRojo = new Inkwell(this,300,600,"tinteroR") //Inicializa tintero rojo

      //DIALOGUE
      //let texto = 'Dejame pasar, he perdido a mi padre';
      //this.dialogue = new Dialogue(this, 400, 425, "box", texto);

           //DOCUMENTO

           this.document = new Document(this,500,600,"document") //Inicializa documento
           this.document.visible=false;

      //LIBRO
      
      this.book = new Book(this,550,600,"book","book2") //Inicializa libro
      this.book.visible=false;


    }

    handleTimeFinished(){

    }


  
    update(time, delta) {
      this.clock.update();
      //this.chara.quetemuevas();

      if (this.bell.clicked){ //Timbre
        this.chara.EnterChar();
      }

      if(this.chara.currentS === this.chara.States.SHOW) //Aparece libro
      {
        this.book.visible=true;
        this.document.visible=true;
      }

      if(this.tinteroRojo.clicked) //Boton de alarma
      {
        this.chara.DenyChar();
        this.book.cerrarSprites();
        this.book.resetPos(); //Devuelve posición inicial al book
        this.document.resetPos(); //Devuelve posición inicial al document
      }

      if(this.tinteroVerde.clicked) //Boton de alarma
      {
        this.chara.AcceptChar();
        this.book.cerrarSprites();
        this.book.resetPos(); //Devuelve posición inicial al book
        this.document.resetPos(); //Devuelve posición inicial al document
      }
    }
  }