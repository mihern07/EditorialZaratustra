export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: "main" });
    }
    preload() {
      this.load.image("background", "sprites/Background.png")
      this.load.image("foreground", "sprites/Foreground.png")
    }
  
    create() {
      let bg=this.add.sprite(500,392,"background") // Los NPC's solo se ven por encima del bg
      let fg=this.add.sprite(500,392,"foreground") 
    }
  
    update(time, delta) {}
  }
  