class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('title', 'sprites/title.jpg');
	}

	create() {
		 var bg = this.add.sprite(0,0,'title');
		  bg.setOrigin(0,0);

		  var text = this.add.text(100,100, 'Editorial Zaratustra!');
		  text.setInteractive({ useHandCursor: true });
		  text.on('pointerdown', () => this.clickButton());

	}

	clickButton() {
		this.scene.switch("mainO");
	}

}

export default TitleScene;