import { dialogueConst } from "./constants.js";
export default class Dialogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, texto) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.setScale(dialogueConst.scale);

        //Dependiendo del valor de sprite, se crea el texto en una "y" distinta
        if (sprite == "box")
            this.texto = scene.add.text(x + dialogueConst.offsetX, y + dialogueConst.offsetY, texto, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3); //Añadimos texto.
        else
            this.texto = scene.add.text(x + dialogueConst.offsetX, y + dialogueConst.radioOffsetY, texto, { fontFamily: 'Yeon Sung' }).setStroke('#000000', 3);

        this.texto.setFontSize(17);
    }

    //Establecemos el texto
    setText(text) {
        this.texto.text = text;
    }

    //Hacemos visible el diálogo
    setVisible(isVisible) {
        this.visible = isVisible;
        this.texto.visible = isVisible;
    }

    //Destruimos el texto
    destroyText() {
        this.texto.destroy();
    }
}