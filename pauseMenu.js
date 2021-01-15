
class pauseMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'pause' });
    }

    create() {
        this.menu = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'menu');
        this.menu.setInteractive();
        this.menu.setDepth(100);

        this.volume = this.add.image(this.game.config.width / 10, this.game.config.height / 10, 'volume');
        this.volumeBold = this.add.image(this.game.config.width / 10, this.game.config.height / 10, 'volume2');
        this.noVolume = this.add.image(this.game.config.width / 10, this.game.config.height / 10, 'noVolume');
        this.noVolumeBold = this.add.image(this.game.config.width / 10, this.game.config.height / 10, 'noVolume2');
        this.volume.setInteractive();
        this.volumeBold.setInteractive();
        this.noVolume.setInteractive();
        this.noVolumeBold.setInteractive();
        this.volume.setScale(.3);
        this.volumeBold.setScale(.3);
        this.noVolume.setScale(.3);
        this.noVolumeBold.setScale(.3);

        this.volumeBold.visible = false;
        this.noVolume.visible = false;
        this.noVolumeBold.visible = false;


        this.continue = this.add.image(this.game.config.width / 2, this.game.config.height / 3, 'continue');
        this.continueBold = this.add.image(this.game.config.width / 2, this.game.config.height / 3, 'continue2');
        this.exit = this.add.image(this.game.config.width / 2, this.game.config.height - this.game.config.height / 3, 'exit');
        this.exitBold = this.add.image(this.game.config.width / 2, this.game.config.height - this.game.config.height / 3, 'exit2');

        this.continue.setDepth(100);
        this.continueBold.setDepth(100);
        this.exit.setDepth(100);
        this.exitBold.setDepth(100);
        this.continue.setInteractive();
        this.continueBold.setInteractive();
        this.exit.setInteractive();
        this.exitBold.setInteractive();

        this.continueBold.visible = false;
        this.exitBold.visible = false;

        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.volume.on('pointerover', pointer => {
            this.volumeBold.visible = true;
        });

        this.volumeBold.on('pointerout', pointer => {
            this.volumeBold.visible = false;
        });

        this.noVolume.on('pointerover', pointer => {
            this.noVolumeBold.visible = true;
        });

        this.noVolumeBold.on('pointerout', pointer => {
            this.noVolumeBold.visible = false;
        });


        this.continue.on('pointerover', pointer => {
            this.continueBold.visible = true;
        });

        this.continueBold.on('pointerout', pointer => {
            this.continueBold.visible = false;
        });

        this.exit.on('pointerover', pointer => {
            this.exitBold.visible = true;
        });

        this.exitBold.on('pointerout', pointer => {
            this.exitBold.visible = false;
        });

        this.continueBold.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.scene.switch(this.originSceneKey);
            }
        })

        this.exitBold.on("pointerdown", pointer => {
            this.exitBold.visible = true;
            if (pointer.leftButtonDown()) {
                this.musics.stop();
                this.scene.sleep(this.originSceneKey);
                this.scene.switch('titleScene');
            }
        })

        this.volumeBold.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                // this.noVolume.setActive(true);
                // this.noVolumeBold.setActive(true);
                // this.volume.setActive(false);
                // this.volumeBold.setActive(false);
                this.noVolume.visible = true;
                this.volume.visible = false;
                this.volumeBold.visible = false;

                this.musics.volume = 0;
                this.play = false;
            }
        })

        this.noVolumeBold.on("pointerdown", pointer => {
            if (pointer.leftButtonDown()) {
                this.noVolume.visible = false;
                this.noVolumeBold.visible = false;
                this.volume.visible = true;

                this.musics.volume = 1;
                this.play = true;
            }
        })


    }

    init(data) {
        this.musics = data.music;
        this.play = data.playing;
        this.originSceneKey = data.key;
    }

    update() {
        if (this.keyEsc.isDown) {
            this.keyEsc.reset();
            this.scene.switch(this.originSceneKey);
        }
    }

}

export default pauseMenu;