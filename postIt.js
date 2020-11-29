export default class PostIt extends Phaser.GameObjects.Sprite  {

constructor(scene,x ,y , sprite, text) {
super(scene,x,y,sprite);

this.scene.add.existing(this);
// Se puede arrastrar
this.setInteractive({draggable: true, dropZone: true});

this.info =scene.add.text(x-10,y-18,text, {color: 0x0A0A0A}); //Añadimos texto.
this.info.setScale(.8);
//Arrastrar con cualquiera de los clicks
//Se determina la region exacta por la que se puede arrastrar el PostIt
this.on('drag', pointer=> {
    if((pointer.x > 890 && pointer.x > 890 +(this.y - 400) && pointer.y > 85 && pointer.x < 1040 && pointer.y < 400 + (this.x - 890)) && (pointer.leftButtonDown() || pointer.rightButtonDown())){
        this.x = pointer.x;
        this.y = pointer.y;
        this.info.y = this.y -18;
        this.info.x = this.x-10;
    }
})

}

// setText(newText){
//     this.info = newText;

// }

}