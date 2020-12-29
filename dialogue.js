import { dialogueConst } from "./constants.js";
export default class Dialogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, texto) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.setScale(dialogueConst.scale);

        this.texto = scene.add.text(x + dialogueConst.offsetX, y + dialogueConst.offsetY, texto, { color: 0x0A0A0A }); //Añadimos texto.
        this.texto.setStroke('#000000', 3);
    }

    setText(text) {
        this.texto.text = text;
    }

    setVisible(isVisible) {
        this.visible = isVisible;
        this.texto.visible = isVisible;
    }
}