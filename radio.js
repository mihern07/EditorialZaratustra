export default class Radio extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, events) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.events = events;
    this.setScale(.8);
    scene.add.existing(this);


    this.notActiveButton = scene.add.sprite(x + 65, y + 40, "radioNotActiveButton");
    this.notActiveButton.setScale(.08);

    this.activeButton = scene.add.sprite(x + 65, y + 40, "radioActiveButton").setInteractive();
    this.activeButton.setScale(.08);
    this.activeButton.visible = false;

    this.inProgress = false;

    //Cuando es pulsado dicho sprite...
    this.activeButton.on('pointerdown', pointer => {
      if (pointer.leftButtonDown() && !this.inProgress && this.events.chara.currentS == this.events.chara.States.INI) {
        //Activar diálogo de radio
        this.inProgress = true;
        console.log("Radio pulsada");
      }
    });
  }
  setActive(){
    this.notActiveButton.visible = false;
    this.activeButton.visible = true;
  }

  setNotActive(){
    this.notActiveButton.visible = true;
    this.activeButton.visible = false;
    this.inProgress = false;
  }
}