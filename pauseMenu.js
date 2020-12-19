class pauseMenu extends Phaser.Scene {

	constructor() {
		super({key:'pause'});
	}

	preload() {
		this.load.image('menu', 'sprites/menu.jpg');
	}

	create() {
        this.menu = this.add.image(400, 300, 'menu');
        this.menu.setScale(19);
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }
    
    update(){
        if(this.keyEsc.isDown){
            this.scene.stop();
            this.scene.resume('main');
        }
    }

}

export default pauseMenu;