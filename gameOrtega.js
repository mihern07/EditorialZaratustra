export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("book","sprites/LibroCerrado.png");
      this.load.image("book2","sprites/LibroAbierto.png");
    }
  
    create() {
      this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.
  
      let pointer=this.input.activePointer; // Raton.
  
      let mySprite=this.add.sprite(500,500,"book").setInteractive(); //setInteractive permite ser pulsado.
      let mySprite2=this.add.sprite(500,500,"book2").setInteractive();
  
      mySprite2.visible=false; //visible permite hacer visible o no un sprite.
  
      mySprite.setScale(.5);    
  
      //Cuando es pulsado dicho sprite...
      mySprite.on("pointerdown", pointer => {
        //hacer algo.
        console.log("Libro pulsado");
        mySprite.visible=false;
        mySprite2.visible=true;
      })
  
      mySprite2.on("pointerdown", pointer => {
        //hacer algo.
        console.log("Libro abierto pulsado");
        mySprite2.visible=false;
        mySprite.visible=true;
      })
  
      this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    }
  
    update(time, delta) {
    }
  }