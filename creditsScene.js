import { creditsConst } from "./constants.js";

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' });
    }

    preload() {
        this.load.image("title1","sprites/title.png");
        this.load.image("creditsBG","sprites/creditbg.png");
    }

    init(gameManager) {
        this.gameManager = gameManager;
    }

    create() {
        //FONDO
        this.background = this.add.sprite(creditsConst.posX, 400, "creditsBG");
        this.background.setScale(1.9);

        //CREDITOS
        this.logo = this.add.sprite(creditsConst.posX, creditsConst.posY, "title1");
        this.logo.setScale(creditsConst.scale);

        this.text1 = this.add.text(creditsConst.pos2X, creditsConst.pos2Y, "Desarrolladores principales", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text1.setFontSize(creditsConst.textSize);

        this.text2 = this.add.text(creditsConst.pos2X, creditsConst.pos3Y, "- Daniel Illanes\n- Miguel Hernández\n- Sergio José Alfonso\n- Alejandro Ortega", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text2.setFontSize(creditsConst.size);

        this.text3 = this.add.text(creditsConst.pos2X, creditsConst.pos4Y, "Arte", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text3.setFontSize(creditsConst.textSize);

        this.text4 = this.add.text(creditsConst.pos2X, creditsConst.pos5Y, "- Alicia Alfonso (@aliciaalfonso_designs)\n- Javier Puerto (@reivart.j)", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text4.setFontSize(creditsConst.size);

        this.text5 = this.add.text(creditsConst.pos2X, creditsConst.pos6Y, "Sonidos y música", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text5.setFontSize(creditsConst.textSize);

        this.text6 = this.add.text(creditsConst.pos2X, creditsConst.pos7Y, "www.sonidosmp3gratis.com\nfreesound.org", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text6.setFontSize(creditsConst.size);

        this.text7 = this.add.text(creditsConst.pos2X, creditsConst.pos8Y, "¡Gracias por jugar!", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.text7.setFontSize(creditsConst.textSize);
    }

    update() {
        if(this.logo.y > -500)
            this.logo.y -= 1;

        if(this.text1.y > -500)
            this.text1.y -= 1;

        if(this.text2.y > -500)
            this.text2.y -= 1;

        if(this.text3.y > -500)
            this.text3.y -= 1;

        if(this.text4.y > -500)
            this.text4.y -= 1;

        if(this.text5.y > -500)
            this.text5.y -= 1;

        if(this.text6.y > -500)
            this.text6.y -= 1;

        if(this.text7.y > -500)
            this.text7.y -= 1;
        else
            this.scene.start('titleScene');
    }
}