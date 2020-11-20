import Clock from "./Clock.js";

let spriteClock;
export default class Game extends Phaser.Scene {

    /** @type {Clock} */
    clock

    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("clock","sprites/clockPrototype.png");
      this.load.image("manecilla","sprites/manecilla.png");
    }
  
    create() {
      this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });

      spriteClock = this.add.sprite(900,150,"clock");
      spriteClock.setScale(0.5);

      let timerLabel = this.add.sprite(900,150,"manecilla");
      timerLabel.setScale(0.5);
    
      this.clock = new Clock(this, timerLabel);
      this.clock.start(this.handleTimeFinished.bind(this), '180000');
    }
  
    handleTimeFinished(){

    }

    update(time, delta) {
        this.clock.update();
    }
  }
  