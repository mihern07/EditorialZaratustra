import Book from "./book.js";
import Clock from "./Clock.js";
import Dialogue from "./dialogue.js";
import DeskBell from "./deskbell.js";
import Character from "./character.js";

export default class Game extends Phaser.Scene {

// /** @type {Phaser.GameObjects.Sprite} */
// clock

// /** @type {Phaser.GameObjects.Sprite} */
// dialogue

// /** @type {Phaser.GameObjects.image} */
// clockImage

    constructor() {
      super({ key: "main" });
    }
    preload() { //Carga de sprites
      this.load.image("background", "sprites/Background.png")
      this.load.image("foreground", "sprites/Foreground.png")
      this.load.image("book","sprites/LibroCerrado.png");
      this.load.image("book2","sprites/LibroAbierto.png");
      this.load.image("clock","sprites/clockPrototype.png");
      this.load.image("manecilla","sprites/manecilla.png");
      this.load.image("box", "sprites/dialoguebox.png");
      this.load.image("character", "sprites/Personaje.png");
      this.load.image("deskBellPressed","sprites/TimbrePulsado.png");
      this.load.spritesheet("deskBellSP","sprites/TimbreSheet.png", { frameWidth: 385, frameHeight: 356 });
    }
  
    create() {
        //GLOBAL
        this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.
        let pointer=this.input.activePointer; // Raton.


      //FONDO
      let bg=this.add.sprite(550,397,"background") // Los NPC's solo se ven por encima del bg

      //CLOCK
      this.clock = new Clock(this, 750, 55, "clock", "manecilla");
      this.clock.start(this.handleTimeFinished.bind(this), '180000');

      //Personaje
  
      this.chara  = new Character(this,955,380,"character")

      let fg=this.add.sprite(550,392,"foreground") 


      //LIBRO
      
      let book = new Book(this,550,600,"book","book2")

      //DESKBELL
  
      let bell  = new DeskBell(this,825,500,"deskBellSP", "deskBellPressed")

      //DIALOGUE
      //let texto = 'Dejame pasar, he perdido a mi padre';
      //this.dialogue = new Dialogue(this, 400, 425, "box", texto);

    }

    handleTimeFinished(){

    }


  
    update(time, delta) {
        this.clock.update();
        this.chara.quetepares();;
    }
  }