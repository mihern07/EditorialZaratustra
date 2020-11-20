import Book from "./book.js";

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("book","sprites/LibroCerrado.png"); //Carga de sprites
      this.load.image("book2","sprites/LibroAbierto.png");
    }
  
    create() {
      this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.

      let pointer=this.input.activePointer; // Raton.
      
      let book = new Book(this,500,500,"book","book2")
      book.setScale(.5)

      
    }
  
    update(time, delta) {
    }
  }