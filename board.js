import PostIt from "./postIt.js";

export default class Board extends Phaser.GameObjects.Sprite  {

constructor(scene,x,y, numPost, sprite, spritePost) {
super(scene,x,y,sprite);

scene.add.existing(this);

//Texto de los PostIts
this.categories = ["Nov\nela","Poe\nsía","Tea\ntro","Rom\nanc\ne","Ave\nntu\nra","Sus\npen\nse","His\ntór\nico","Pol\nici\naco","Dra\nma","Fan\ntas\nía","Aca\ndém\nico","Com\nedi\na","Fic\nció\nn"]
this.categorySprites = ["novelaPost","poesiaPost","TeatroPost","romancePost","aventuraPost","suspensePost","historicoPost","policiacoPost","dramaPost","fantasiaPost","academicoPost","comediaPost","ficcionPost"]
this.postIts = [];

for(let i = 0; i < numPost;i++){
    if(i < 3){
        this.postIts.push(new PostIt(this.scene, this.x -45 + i*5, this.y - 75, "postIt", this.categories[i]));
    }
    else{
        this.postIts.push(new PostIt(this.scene, this.x -45 + i*5, this.y - 75, this.categorySprites[i], this.categories[i]));
    }
}


for(let i = 0; i < this.postIts.length;i++){
    this.postIts[i].setScale(.15);
}

// this.postIts.forEach(element => {
//     this.postIts[element].setScale(.15);
// });


}

}