import Book from "./book.js";
import Clock from "./Clock.js";
import Dialogue from "./dialogue.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";
import Inkwell from "./Inkwell.js";

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
      this.load.image("box", "sprites/dialoguebox.png"); //Bocadillo = box
      this.load.image("character", "sprites/Personaje.png"); //personaje = character
      this.load.image("deskBellPressed","sprites/TimbrePulsado.png"); //timbre pulsado = deskBellPressed
      this.load.spritesheet("deskBellSP","sprites/TimbreSheet.png", { frameWidth: 385, frameHeight: 356 }); //timbre = deskBellSP
      this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
      this.load.image("tinteroR", "sprites/tinteroRojo.png"); // tintero rojo = tinteroR
      this.load.text("ninio", "dialogue/Ninio.txt");
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

      //DESKBELL
  
      this.bell  = new DeskBell(this,825,500,"deskBellSP", "deskBellPressed") //Inicializa timbre

      //TINTEROS

      this.tinteroVerde = new Inkwell(this,200,600,"tinteroV") //Inicializa tintero verde

      this.tinteroRojo = new Inkwell(this,300,600,"tinteroR") //Inicializa tintero rojo

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
        }

        if(this.tinteroRojo.clicked) //Boton de alarma
        {
          this.chara.DenyChar();
          this.book.cerrarSprites();
          this.book.resetPos(); //Devuelve posición inicial al book
        }

        if(this.tinteroVerde.clicked) //Boton de alarma
        {
          this.chara.AcceptChar();
          this.book.cerrarSprites();
          this.book.resetPos(); //Devuelve posición inicial al book
        }
    }
  }