
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
                    this.musics.stop();
                    this.scene.stop(this.originSceneKey);
                    this.scene.switch('titleScene');
                }
                else{
                    this.scene.stop();
                    this.scene.resume(this.originSceneKey);
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

    init(data)
    {
        this.musics = data.music;
        this.play = data.playing;
        this.originSceneKey = data.key;
    }

}

export default pauseMenu;