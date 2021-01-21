import { storyIntro } from "./constants.js";

export default class StoryIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'storyIntro' });
    }

    create(levelManager) {
        this.background = this.add.sprite(storyIntro.backgroundPosX, storyIntro.backgroundPosY, "street");
        this.background.setInteractive();

        this.fondo = this.add.sprite(storyIntro.backgroundPosX, storyIntro.backgroundPosY, "fondo");
        this.fondo.setScale(storyIntro.backgroundScaleX, storyIntro.backgroundScaleY);

        this.dialogoAPartir = this.cache.text.get("intro");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 4;
        //Primer texto
        this.text = this.dialogoAPartir.slice(this.i, this.j);
        this.i = this.i + 4;
        this.j = this.j + 4;

        this.showText = this.add.text(storyIntro.textPosX, storyIntro.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(storyIntro.textScale);

        //Avanza texto hasta llegar al final y empezar el primer nivel
        this.background.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.showText.destroy();
                this.text = this.dialogoAPartir.slice(this.i, this.j);
                if (this.text.length == 0) {
                    levelManager.firstLevel();
                }
                else {
                    this.showText = this.add.text(storyIntro.textPosX, storyIntro.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(storyIntro.textScale);
                    this.i = this.i + 4;
                    this.j = this.j + 4;
                }
            }
        });
    }
}