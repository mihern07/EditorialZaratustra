
class pauseMenu extends Phaser.Scene {

	constructor() {
		super({key:'pause'});
	}

	preload() {
        this.load.image('menu', 'sprites/menu.png');
        this.load.image('volume','sprites/volumen.png');
	}

	create() {
        this.menu = this.add.image(this.game.config.width/2 , this.game.config.height/2, 'menu');
        this.menu.setInteractive();

        this.volume = this.add.image(this.game.config.width/5 , this.game.config.height/5, 'volume');
        this.volume.setInteractive();

        this.menu.on("pointerdown", pointer=>{
            if(pointer.leftButtonDown()){
                if(pointer.y > this.menu.y){
                    console.log("titleEscene");
                    this.scene.stop('main');
                    this.musics.stop();
                    this.scene.switch('titleScene');
                }
                else{
                    console.log("MAIN");
                    this.scene.stop();
                    this.scene.resume('main');
                }
            }
        })

        this.volume.on("pointerdown", pointer=>{
            if(pointer.leftButtonDown()){
                if(this.play)
                {
                    this.musics.volume=0;
                    this.play=false;
                }
                else{
                    this.musics.volume=1;
                    this.play=true;
                }

                //this.musics.volume-=0.1;
            }
        })
    }

    init(music,isPlaying)
    {
        this.musics = music;
        this.play=isPlaying;
    }

}

export default pauseMenu;