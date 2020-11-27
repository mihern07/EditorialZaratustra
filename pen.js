export default class Pen extends Phaser.GameObjects.Sprite{

    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.GameObjects.Sprite} */
    PenV

    /** @type {Phaser.GameObjects.Sprite} */
    PenR

    constructor(scene,x,y,sprite,sprite2,sprite3)
    {
        super(scene,x,y,sprite)
        
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;
        this.setScale(.3);
        
        scene.add.existing(this);
        
        this.setInteractive();        

        this.States = {NORMAL: 0, GREEN: 1, RED: 2}; 
        this.States=0

        this.PenR = scene.add.sprite(this.x,this.y,sprite2).setInteractive(); //Pluma Roja

        this.PenV = scene.add.sprite(this.x,this.y,sprite3).setInteractive(); //Pluma Verde

        this.setScale(.3)
        this.PenR.setScale(.3)
        this.PenV.setScale(.3)
        
        this.scene.input.setDraggable(this);
        this.scene.input.setDraggable(this.PenR);
        this.scene.input.setDraggable(this.PenV);

        this.PenR.setDamping = true;
        this.PenV.setDamping = true;
        this.setDamping = true;

        switch(this.States)
        {
            case 0: //Sprite normal
                this.visible=true;
                this.PenV.visible=false;
                this.PenR.visible=false;
                break;
            case 1: //Sprite verde
                this.PenV.visible=true;
                this.visible=false;
                this.PenR.visible=false;
                break;
            case 2: //Sprite rojo
                this.PenR.visible=true;
                this.visible=false;
                this.PenV.visible=false;
                break;
        }
        
        this.on('drag', pointer=> {
            if(pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })

        this.PenV.on('drag', pointer=> {
            if(pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })

        this.PenR.on('drag', pointer=> {
            if(pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })
    }

    setRed()
    {
        this.States=2; //ROJO
    }

    setGreen()
    {
        this.States=1; //VERDE
    }

    changeColor()
    {
        switch(this.States)
        {
            case 0: //Sprite normal
                this.visible=true;
                this.PenV.visible=false;
                this.PenR.visible=false;
                break;
            case 1: //Sprite verde
                this.PenV.visible=true;
                this.visible=false;
                this.PenR.visible=false;
                break;
            case 2: //Sprite rojo
                this.PenR.visible=true;
                this.visible=false;
                this.PenV.visible=false;
                break;
        }
    }

    resetPos(){
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.PenV.x = this.x;
        this.PenV.y = this.y;
        this.PenR.x = this.x;
        this.PenR.y = this.y;
    }
}