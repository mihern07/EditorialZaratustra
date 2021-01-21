export default class Draggable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, limitX0, limitXX, limitY0, limitYY) {
        super(scene, x, y, sprite);

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setInteractive({ draggable: true, dropZone: true });

        this.drag = false;

        this.on('drag', pointer => {
            if (this.visible)
                if (pointer.leftButtonDown())
                    if ((pointer.x > limitX0 && pointer.x < limitXX && pointer.y > limitY0 && pointer.y < limitYY)) {
                        this.x = pointer.x;
                        this.y = pointer.y;
                        this.drag = true;
                    }
        })

        this.on('dragend', function () {
            this.drag = false;
        })
    }
}