export default class PostIt extends Phaser.GameObjects.Sprite  {

constructor(scene,x ,y , sprite) {
super(scene,x,y,sprite);

this.scene.add.existing(this);
// Se puede arrastrar
this.setInteractive({draggable: true, dropZone: true});

this.info =scene.add.text(x-20,y,"Historia", {color: 0x0A0A0A}); //Añadimos texto.
this.info.setScale(.5);
//Arrastrar con cualquiera de los clicks
this.on('drag', pointer=> {
    if(pointer.leftButtonDown() || pointer.rightButtonDown()){
        this.x = pointer.x;
        this.y = pointer.y;
        this.info.y = this.y;
        this.info.x = this.x-20;
    }
})

}

// setText(newText){
//     this.info = newText;

// }

}