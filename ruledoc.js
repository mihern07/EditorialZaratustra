import { ruleConst, draggableConst } from "./constants.js";
import Draggable from "./draggable.js";

export default class RuleDoc extends Draggable {
    constructor(scene, x, y, sprite, sprite2, pags, noticias) {
        super(scene, x, y, sprite, draggableConst.tableX0, draggableConst.tableXX, draggableConst.tableY0, draggableConst.tableYY)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.pags = pags;
        this.noticias = noticias;

        this.setScale(ruleConst.scale);
        this.setDepth(ruleConst.depth);

        this.visible = false;

        this.pageSound = this.scene.sound.add("pageSound");

        //Sprite ibro abierto
        this.ruleDoc2 = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.ruleDoc2.setScale(ruleConst.openedScale);
        this.ruleDoc2.visible = false;

        this.ruleDoc2.x = this.scene.game.config.width / 2;
        this.ruleDoc2.y = this.scene.game.config.height / 2;
        this.ruleDoc2.setDepth(ruleConst.openedDepth);

        //Información a escribir sobre la logintud de páginas de los libros
        this.pagsInfo = []


        //Añade la info sobre el numero de paginas
        for (let i = 0; i < this.pags.length; i++) {
            this.pagsInfo.push(scene.add.text(this.x + ruleConst.offsetX, this.y + ruleConst.offsetY + (i * ruleConst.offsetYAcum), this.selectPags(this.pags[i]), { fontFamily: 'Barlow Condensed', color: 0x5D3C09 }).setStroke('#5D3C09', 1))
            this.pagsInfo[i].visible = false;
            this.pagsInfo[i].setDepth(ruleConst.openedDepth);
        }

        //Añade la info sobre las noticias
        for (let i = 0; i < this.noticias.length; i++) {
            if (this.noticias.length > 4 && i == 4)
                this.noticiasInfo += "\n";

            if (this.noticias.length != 1 && i == this.noticias.length - 1)
                this.noticiasInfo += "y " + noticias[i];
            else if (this.noticias.length != 1 && i == 0)
                this.noticiasInfo = noticias[i] + ", ";
            else if (this.noticias.length != 1)
                this.noticiasInfo += noticias[i] + ", ";
            else if (this.noticias.length != 1 && i == this.noticias.length - 2)
                this.noticiasInfo += noticias[i] + " ";
            else
                this.noticiasInfo = noticias[i];
        }
        console.log(this.noticiasInfo);
        
        //Información a escribir sobre las noticias
        this.noticiasText = scene.add.text(this.x + ruleConst.offsetX, this.y + ruleConst.noticiaOffsetY, this.noticiasInfo, 
            { fontFamily: 'Barlow Condensed', color: 0x5D3C09 }).setStroke('#5D3C09', 1);
        
        this.noticiasText.visible = false;
        this.noticiasText.setDepth(ruleConst.openedDepth);

        //Alternar entre abierto y cerrado
        this.on("pointerdown", pointer => {
            this.switchSprite(pointer);
        })

        this.ruleDoc2.on("pointerdown", pointer => {
            this.switchSprite(pointer);
        })
    }

    switchSprite(pointer) {
        if (pointer.rightButtonDown()) {
            this.pageSound.play();
            this.visible = !this.visible;
            this.ruleDoc2.visible = !this.ruleDoc2.visible;
            this.noticiasText.visible = !this.noticiasText.visible
            for (let i = 0; i < this.pagsInfo.length; i++) {
                this.pagsInfo[i].visible = !this.pagsInfo[i].visible;
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