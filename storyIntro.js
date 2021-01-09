export default class StoryIntro extends Phaser.Scene{
    constructor() {
        super({key: 'storyIntro'});
    }
    preload(){
        this.load.text("intro", "dialogue/storyIntro.txt");
        this.load.image("street", "sprites/street.jpg");
    }

    create(){
        this.background = this.add.sprite(550, 400, "street");
        this.background.setInteractive();
        this.dialogoAPartir = this.cache.text.get("intro");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 2;
        this.text = this.dialogoAPartir.slice(this.i,this.j);
        this.i = this.i + 2;
        this.j = this.j + 2;

        this.showText = this.add.text(200, 300, this.text);



        this.background.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.showText.destroy();
                this.text = this.dialogoAPartir.slice(this.i,this.j);
                if (this.text.length == 0){
                    this.scene.switch("main");
                }
                this.showText = this.add.text(200, 300, this.text);
                this.i = this.i + 2;
                this.j = this.j + 2;
            }
          });
    }
}