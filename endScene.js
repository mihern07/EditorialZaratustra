import { storyIntro} from "./constants.js";
import CreditsScene from "./creditsScene.js";

export default class EndScene extends Phaser.Scene{
    constructor() {
        super({key: 'endScene'});
    }
    preload(){
		this.load.text("introEnd", "dialogue/ricardoDialogue.txt");
		this.load.text("end1", "dialogue/dontSpyEnding.txt");
		this.load.text("end2", "dialogue/spyEnding.txt");
        this.load.image("street", "sprites/street.jpg");
        this.load.image("fondo", "sprites/negro_semitransparente.png");
    }

    create(){
        this.background = this.add.sprite(storyIntro.backgroundPosX, storyIntro.backgroundPosY, "street");
        this.background.setInteractive();
        
        this.fondo = this.add.sprite(storyIntro.backgroundPosX, storyIntro.backgroundPosY, "fondo");
		this.fondo.setScale(storyIntro.backgroundScaleX, storyIntro.backgroundScaleY);
		
		this.button1 = this.add.sprite(300,700,"rules").setInteractive();
		this.button1.setScale(.5);
		this.button1.visible=false;

		this.button2 = this.add.sprite(900,700,"pen").setInteractive();
		this.button2.setScale(.5);
		this.button2.visible=false;

		this.buttonpressed=false;
        
        this.dialogoAPartir = this.cache.text.get("introEnd");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 3;
        this.text = this.dialogoAPartir.slice(this.i,this.j);
        this.i = this.i + 3;
        this.j = this.j + 3;

        this.showText = this.add.text(storyIntro.textPosX, storyIntro.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(storyIntro.textScale);
        
        this.background.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                this.text = this.dialogoAPartir.slice(this.i,this.j);
                if (this.text.length == 0){
                    if(this.buttonpressed)
                        this.scene.switch("creditsScene");
                    else
                    {
                        this.button1.visible=true;
                        this.button2.visible=true;
                    }
                }
                else{
					this.showText.destroy();
                    this.showText = this.add.text(storyIntro.textPosX, storyIntro.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(storyIntro.textScale);
                    this.i = this.i + 3;
                    this.j = this.j + 3;
                }
			}
		  });
			  
		this.button1.on('pointerdown',pointer=> {
			if(pointer.leftButtonDown())
			{
                this.changeText("end1");

                this.changeSprite();

				this.buttonpressed=true;
			}
		})

		this.button2.on('pointerdown',pointer=> {
			if(pointer.leftButtonDown())
			{             
                this.changeText("end2");

                this.changeSprite();

				this.buttonpressed=true;
			}
		})
    }

    changeText(txt)
    {
        this.dialogoAPartir = this.cache.text.get(txt);
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 3;

        this.text = this.dialogoAPartir.slice(this.i,this.j);
        this.showText.destroy();
        this.showText = this.add.text(storyIntro.textPosX, storyIntro.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(storyIntro.textScale);
        this.i = this.i + 3;
        this.j = this.j + 3;
    }

    changeSprite()
    {
        this.button1.visible = !this.button1.visible;
        this.button2.visible = !this.button2.visible;
    }
}