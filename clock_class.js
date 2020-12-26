export default class Clock extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, clockImage, manecillaImage){
        super(scene,x,y, clockImage);
        this.scene = scene;
        this.setScale(0.5);
        scene.add.existing(this);

        this.manecilla = scene.add.sprite(x,y, manecillaImage);
        this.manecilla.setScale(0.5);
    }

    /**
     * 
     * @param {() => void} callback 
     * @param {number} duration 
     */
    start(callback, duration = 45000){
        this.stop();

        this.finishedCallback = callback;
        this.duration = duration;

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.stop();

                if (callback){
                    callback();
                }
            }
        })
    }

    setInvisible(){
        this.visible = false;
        this.manecilla.visible = false;
    }

    stop(){
        if (this.timerEvent){
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    }

    preUpdate(){
        if (!this.timerEvent || this.duration <= 0){
            return;
        }

        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.duration - elapsed;
        const seconds = remaining / 1000;
        const time = elapsed /1000;

        this.manecilla.angle = time;
    }
}