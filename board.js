import PostIt from "./postIt.js";
import { boardConst } from "./constants.js";

export default class Board extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, numPost, sprite) {
        super(scene, x, y, sprite);

        scene.add.existing(this);

        //Texto de los PostIts
        this.categories = boardConst.categories;
        this.categorySprites = boardConst.catSprites;
        this.postIts = [];

        for (let i = 0; i < numPost; i++) {
            if (i > 9) {
                this.postIts.push(new PostIt(this.scene, this.x + boardConst.offsetX + i * boardConst.postItDiff, this.y + boardConst.offsetY, "postIt", this.categories[i]));
            }
            else {
                this.postIts.push(new PostIt(this.scene, this.x + boardConst.offsetX + i * boardConst.postItDiff, this.y + boardConst.offsetY, this.categorySprites[i], this.categories[i]));
            }
        }


        for (let i = 0; i < this.postIts.length; i++) {
            this.postIts[i].setScale(boardConst.scale);
        }

    }

}