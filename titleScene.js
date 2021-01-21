import { titleConst } from "./constants.js";
import LevelManager from "./levelManager.js";

class TitleScene extends Phaser.Scene {

	constructor() {
		super({ key: 'titleScene' });
		this.levelManager = new LevelManager(this);
	}

	create() {
		//No permite click derecho en el juego.
		this.input.mouse.disableContextMenu(); 

		let bg = this.add.sprite(titleConst.bgPosX, titleConst.bgPosY, 'title');

		bg.setOrigin(0, 0);

		bg.scale = titleConst.bgScale;

		let anim = this.add.sprite(titleConst.animPosX, titleConst.animPosY, 'anim');
		let animBold = this.add.sprite(titleConst.animPosX, titleConst.animPosY, 'anim2');

		anim.setOrigin(0, 0);
		animBold.setOrigin(0, 0);

		anim.scale = titleConst.animScale;
		animBold.scale = titleConst.animScale;

		animBold.visible = false;

		anim.setInteractive({ useHandCursor: true });
		animBold.setInteractive({ useHandCursor: true });

		//Fade de inicio
		this.cameras.main.fadeIn(2000, 0, 0, 0);

		//Animación del botón
		anim.on('pointerover', function (pointer) {
			animBold.visible = true;
		});

		animBold.on('pointerout', function (pointer) {
			animBold.visible = false;
		});

		animBold.on('pointerdown', () => this.clickButton(anim));
	}

	clickButton() {
		//La escena StoryIntro se elimina la primera vez
		if (this.scene.get("storyIntro") != null) {
			this.scene.run("storyIntro", this.levelManager);
			this.scene.sleep();
		}
		else if (!this.levelManager.started) {
			this.levelManager.firstLevel();
			this.scene.sleep();
		}
		else {
			this.levelManager.restart();
			this.scene.sleep();
		}
	}

}

export default TitleScene;