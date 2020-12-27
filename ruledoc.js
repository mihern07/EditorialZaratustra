import { ruleConst } from "./constants.js";

export default class RuleDoc extends Phaser.GameObjects.Sprite {

    /** @type {Phaser.Scene} */
    scene

    // /** @type {Phaser.GameObjects.Sprite} */
    // Libro

    /** @type {Phaser.GameObjects.Sprite} */
    ruleDoc2

    constructor(scene, x, y, sprite, sprite2, pags) {
        super(scene, x, y, sprite)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;
        this.pags = pags;

        this.setScale(ruleConst.scale);
        this.setDepth(ruleConst.depth);
        //Lo añade a la escena
        this.scene.add.existing(this);

        this.visible = false;
        //Permite interactuar con él
        this.setInteractive({ draggable: true, dropZone: true });

        //Sprite ibro abierto
        this.ruleDoc2 = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.ruleDoc2.setScale(ruleConst.openedScale);
        this.ruleDoc2.visible = false;

        this.ruleDoc2.x = this.scene.game.config.width / 2;
        this.ruleDoc2.y = this.scene.game.config.height / 2;
        this.ruleDoc2.setDepth(ruleConst.openedDepth);

        this.info = []

        for (let i = 0; i < this.pags.length; i++) {
            this.info.push(scene.add.text(this.x + ruleConst.offsetX, this.y + ruleConst.offsetY + (i * ruleConst.offsetYAcum), this.selectPags(this.pags[i]), { color: 0x0A0A0A }))
            this.info[i].visible = false;
            this.info[i].setDepth(ruleConst.openedDepth);
        }

        //Configuración del Drag        
        //this.bound = new Phaser.Geom.Rectangle(100, 100, 500, 400);
        //this.body.setBoundsRectangle(this.bound);

        this.on('drag', pointer => {
            if ((pointer.x > 50
                && pointer.y > 450
                && pointer.y < 900
                && pointer.x < 1040)
                && pointer.leftButtonDown()) {

                this.x = pointer.x;
                this.y = pointer.y;

            }
        })

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                this.visible = !this.visible;
                this.ruleDoc2.visible = !this.ruleDoc2.visible;

                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })

        this.ruleDoc2.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                this.visible = !this.visible;
                this.ruleDoc2.visible = !this.ruleDoc2.visible;
                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })
    }
    // cerrarSprites() {
    //     this.visible = false;
    //     this.ruleDoc2.visible = false;
    // }
    selectPags(val) {
        switch (val) {
            case 0:
                return "Entre 25 y 150 páginas";
            case 1:
                return "Entre 400 y 700 páginas";
            case 2:
                return "Entre 1200 y 3000 páginas";
        }

    }
}