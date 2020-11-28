import PostIt from "./postIt.js";

export default class Board extends Phaser.GameObjects.Sprite  {

constructor(scene,x,y, sprite, spritePost) {
super(scene,x,y,sprite);

scene.add.existing(this);

this.postIt = new PostIt(this.scene, this.x, this.y, spritePost)
this.postIt.setScale(.15);
//this.scene.input.setDraggable(this.postIt);




// //Container
// this.container = scene.add.container(x,y);
// this.scene.add.existing(this.container);
// //Para añadir hijos
// this.postIt = new PostIt(scene, this.x,this.y, spritePost);
// this.container.add(this.postIt);


//this.scene.physics.add.existing(this, true);
}


}