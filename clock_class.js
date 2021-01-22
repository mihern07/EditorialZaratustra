import { clockConst } from "./constants.js";
export default class Clock extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, clockImage) {
        super(scene, x, y, clockImage);
        this.scene = scene;
        this.setScale(clockConst.clockScale);
        scene.add.existing(this);

        //Manecilla del reloj
        this.manecilla = scene.add.sprite(x, y, "manecilla");
        this.manecilla.setScale(clockConst.clockScale);
    }

    //Inicia la cuenta atrás del reloj con una función a la que llamar cuando se finaliza el tiempo
    //y una duración
    start(callback, duration = clockConst.duration) {
        //Reinicia el reloj en caso de haber estado activo antes
        this.stop();

        //Asigna la función y la duración
        this.finishedCallback = callback;
        this.duration = duration;

        //Cuando llega al final de su duración activa la función
        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.stop();

                if (callback) {
                    callback();
                }
            }
        })
    }

    //Hace invisible al reloj pero manteniendo su función de activación de función
    setInvisible() {
        this.visible = false;
        this.manecilla.visible = false;
    }

    //Detiene al reloj
    stop() {
        if (this.timerEvent) {
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    }

    preUpdate() {
        //Si no está activo no hace nada
        if (!this.timerEvent || this.duration <= 0) {
            return;
        }

        //Controlan el tiempo del reloj
        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.duration - elapsed;
        const time = elapsed / 1000;

        //Gira la manecilla
        this.manecilla.angle = time;
    }
}