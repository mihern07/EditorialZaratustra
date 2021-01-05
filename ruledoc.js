import { ruleConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class RuleDoc extends Draggable {
    constructor(scene, x, y, sprite, sprite2, pags) {
        super(scene,x,y,sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.pags = pags;

        this.setScale(ruleConst.scale);
        this.setDepth(ruleConst.depth); 
        //Lo añade a la escena
        // this.scene.add.existing(this);

        this.visible = false;

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

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            //hacer algo.
            this.switchSprite(pointer);
        })

        this.ruleDoc2.on("pointerdown", pointer => {
            //hacer algo.
            this.switchSprite(pointer);
        })
    }
    switchSprite(pointer) {
        if (pointer.rightButtonDown()) {
            this.visible = !this.visible;
            this.ruleDoc2.visible = !this.ruleDoc2.visible;
            for (let i = 0; i < this.info.length; i++) {
                this.info[i].visible = !this.info[i].visible;
            }
        }
    }
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