import Clock from "./Clock.js";
import Dialogue from "./dialogue.js";

let spriteClock;
export default class Game extends Phaser.Scene {

    /** @type {Clock} */
    clock

    /** @type {Phaser.GameObjects.Sprite} */
    dialogue

    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("clock","sprites/clockPrototype.png");
      this.load.image("manecilla","sprites/manecilla.png");
      this.load.image("box", "sprites/dialoguebox.png");
    }
  
    create() {
      this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });

      spriteClock = this.add.sprite(900,150,"clock");
      spriteClock.setScale(0.5);

      let timerLabel = this.add.sprite(900,150,"manecilla");
      timerLabel.setScale(0.5);
    
      this.clock = new Clock(this, timerLabel);
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
  