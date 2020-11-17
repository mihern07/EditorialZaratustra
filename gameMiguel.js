import Clock from "./Clock.js";

export default class Game extends Phaser.Scene {

    /** @type {Clock} */
    clock

    constructor() {
      super({ key: "main" });
    }
    preload() {}
  
    create() {
      this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });

      const timerLabel = this.add.text(300, 50, '0', {fontSize: 48}).setOrigin(0.5);
    
      this.clock = new Clock(this, timerLabel);
      this.clock.start(this.handleTimeFinished.bind(this), '45000');
    }
  
    handleTimeFinished(){

    }

    update(time, delta) {
        this.clock.update();

    }
  }
  