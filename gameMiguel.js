import Clock from "./Clock.js";
import Dialogue from "./dialogue.js";

let spriteClock;
export default class Game extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Sprite} */
    clock

    /** @type {Phaser.GameObjects.Sprite} */
    dialogue

    /** @type {Phaser.GameObjects.image} */
    clockImage
    
    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("clock","sprites/clockPrototype.png");
      this.load.image("manecilla","sprites/manecilla.png");
      this.load.image("box", "sprites/dialoguebox.png");
    }
  
    create() {
      this.clock = new Clock(this, 900, 150, "clock", "manecilla");
      this.clock.start(this.handleTimeFinished.bind(this), '180000');
      
      let texto = 'Texto de ejemplo';
      this.dialogue = new Dialogue(this, 500, 100, "box", texto);
    }
  
    handleTimeFinished(){

    }

    update(time, delta) {
        this.clock.update();
    }
  }
  