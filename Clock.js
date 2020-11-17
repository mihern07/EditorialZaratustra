export default class Clock{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.GameObjects.Text} */
    label

    /** @type {Phaser.Time.timerEvent} */
    timerEvent

    duration = 0;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Phaser.GameObjects.Text} label 
     */
    constructor(scene, label){
        this.scene = scene;
        this.label = label;
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

    stop(){
        if (this.timerEvent){
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    }

    update(){
        if (!this.timerEvent || this.duration <= 0){
            return;
        }

        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.duration - elapsed;
        const seconds = remaining / 1000;
        const time = elapsed /1000;

        this.label.text = time.toFixed(2);
    }
}