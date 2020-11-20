import DeskBell from "./deskbell.js";
import Clock from "./deskbell.js";

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: "gameSergio" });
  }
  preload() {
    this.load.spritesheet("deskBellSP","sprites/TimbreSheet.png", { frameWidth: 385, frameHeight: 356 });
  }

  create() {
    this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.

    let pointer=this.input.activePointer; // Raton.

    let AAAAAAAAAA  = new DeskBell(this,1100,400,"deskBellSP")

    this.anims.create({
      key: "pulsed",
      frames: this.anims.generateFrameNumbers("deskBellSP", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    }); 

    this.anims.create({
      key: "idle",
      frames: [ { key: "deskBellSP", frame: 0 } ],
      frameRate: 10
    }); 
  
      //Cuando es pulsado dicho sprite...
      this.AAAAAAAAAA.on("pointerdown", pointer => {
        //hacer algo.
        console.log("Timbre pulsado");
        AAAAAAAAAA.anims.play("pulsed", true);
      })
  }


  update() {
    this.AAAAAAAAAA.anims.play("pulsed",true);
    //Cuando es pulsado dicho sprite...

    //this.clock.update();
  }
}
  