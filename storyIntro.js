export default class StoryIntro extends Phaser.Scene{
    constructor() {
        super({key: 'storyIntro'});
    }
    preload(){
        this.load.text("intro", "dialogue/storyIntro.txt");
        this.load.image("street", "sprites/street.jpg");
        this.load.image("fondo", "sprites/negro_semitransparente.png");
    }

    create(){
        this.background = this.add.sprite(550, 400, "street");
        this.background.setInteractive();
        this.fondo = this.add.sprite(550, 400, "fondo");
        this.fondo.setScale(.5);
        this.dialogoAPartir = this.cache.text.get("intro");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 4;
        this.text = this.dialogoAPartir.slice(this.i,this.j);
        this.i = this.i + 4;
        this.j = this.j + 4;

        this.showText = this.add.text(200, 350, this.text);



        this.background.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.showText.destroy();
                this.text = this.dialogoAPartir.slice(this.i,this.j);
                if (this.text.length == 0){
                    this.scene.switch("main");
                }
                this.showText = this.add.text(200, 350, this.text);
                this.i = this.i + 4;
                this.j = this.j + 4;
            }
          });
    }
}