import { endConst} from "./constants.js";

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
        this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");

    }

    create(){
        this.background = this.add.sprite(endConst.backgroundPosX, endConst.backgroundPosY, "street");
        this.background.setInteractive();
        
        this.fondo = this.add.sprite(endConst.backgroundPosX, endConst.backgroundPosY, "fondo");
		this.fondo.setScale(endConst.backgroundScaleX, endConst.backgroundScaleY);
		
		this.button1 = this.add.sprite(endConst.button1PosX,endConst.buttonPosY,"buttonNotPressed").setInteractive();
		this.button1.setScale(1.5);
		this.button1.visible=false;

		this.button2 = this.add.sprite(endConst.button2PosX,endConst.buttonPosY,"buttonNotPressed").setInteractive();
		this.button2.setScale(1.5);
        this.button2.visible=false;
        
        this.buttonText1 = this.add.text(endConst.buttonText1PosX, endConst.buttonTextPosY, "No Espiar", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.buttonText1.setFontSize(endConst.buttonTextSize);
        this.buttonText1.visible=false;

        this.buttonText2 = this.add.text(endConst.buttonText2PosX, endConst.buttonTextPosY, "Espiar", { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);
        this.buttonText2.setFontSize(endConst.buttonTextSize);
        this.buttonText2.visible=false;

		this.buttonpressed=false;
        
        this.dialogoAPartir = this.cache.text.get("introEnd");
        this.dialogoAPartir = this.dialogoAPartir.split("\n");

        this.i = 0;
        this.j = 3;
        this.text = this.dialogoAPartir.slice(this.i,this.j);
        this.i = this.i + 3;
        this.j = this.j + 3;

        this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);

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
                        this.buttonText1.visible=true;
                        this.buttonText2.visible=true;
                    }
                }
                else{
					this.showText.destroy();
                    this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);
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
        this.showText = this.add.text(endConst.textPosX, endConst.textPosY, this.text, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3).setFontSize(endConst.textScale);
        this.i = this.i + 3;
        this.j = this.j + 3;
    }

    changeSprite()
    {
        this.button1.visible = !this.button1.visible;
        this.button2.visible = !this.button2.visible;
        this.buttonText1.visible = !this.buttonText1.visible;
        this.buttonText2.visible = !this.buttonText2.visible;
    }
}