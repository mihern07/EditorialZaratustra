import {titleConst} from "./constants.js";

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('title', 'sprites/logoBien.png');
		this.load.image('anim', 'sprites/anim.png');
		this.load.image('anim2', 'sprites/anim2.png');
	}

	create() {
		var bg = this.add.sprite(titleConst.bgPosX,titleConst.bgPosY,'title');
		
		bg.setOrigin(0,0);
		
		bg.scale = titleConst.bgScale;
		
		var anim = this.add.sprite(titleConst.animPosX,titleConst.animPosY, 'anim');
		var animBold = this.add.sprite(titleConst.animPosX,titleConst.animPosY, 'anim2');
		
		anim.setOrigin(0,0);
		animBold.setOrigin(0,0);

		anim.scale = titleConst.animScale;
		animBold.scale = titleConst.animScale;
	
		animBold.visible = false;

		anim.setInteractive({ useHandCursor: true });
		animBold.setInteractive({ useHandCursor: true });
		
		anim.on('pointerover', function(pointer){
			animBold.visible = true;

		});

		animBold.on('pointerout', function(pointer){
			animBold.visible = false;
		});

		animBold.on('pointerdown', () => this.clickButton(anim));
	}

	clickButton() {
		this.scene.switch("main");
	}

}

export default TitleScene;