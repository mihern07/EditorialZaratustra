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
		var bg = this.add.sprite(15,0,'title');
		
		bg.setOrigin(0,0);
		
		bg.scale = 0.57;
		
		var anim = this.add.sprite(50,390, 'anim');
		var animBold = this.add.sprite(50, 390, 'anim2');
		
		anim.setOrigin(0,0);
		animBold.setOrigin(0,0);

		anim.scale = 0.6;
		animBold.scale = 0.6;
	
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