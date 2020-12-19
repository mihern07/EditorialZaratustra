class pauseMenu extends Phaser.Scene {

	constructor() {
		super({key:'pause'});
	}

	preload() {
		this.load.image('menu', 'sprites/menu.png');
	}

	create() {
        this.menu = this.add.image(this.game.config.width/2 , this.game.config.height/2, 'menu');
        this.menu.setInteractive();

        this.menu.on("pointerdown", pointer=>{
            if(pointer.leftButtonDown()){
                if(pointer.y > this.menu.y){
                    console.log("titleEscene");
                    this.scene.stop('main');
                    this.scene.switch('titleScene');
                }
                else{
                    console.log("MAIN");
                    this.scene.stop();
                    this.scene.resume('main');
                }
            }
        })
    }

}

export default pauseMenu;