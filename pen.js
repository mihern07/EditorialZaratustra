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

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.setScale(.2);
        
        scene.add.existing(this);
        
        this.setInteractive();        
        this.setDepth(3);

        this.States = {NORMAL: 0, GREEN: 1, RED: 2}; 
        this.States = this.States.NORMAL;
        this.hasSigned = false;

        this.PenR = scene.add.sprite(this.x,this.y,sprite2).setInteractive(); //Pluma Roja

        this.PenV = scene.add.sprite(this.x,this.y,sprite3).setInteractive(); //Pluma Verde

        this.scene.physics.add.existing(this.PenR);
        this.PenR.body.allowGravity = false;
        this.PenR.setDepth(3);

        this.scene.physics.add.existing(this.PenV);
        this.PenV.body.allowGravity = false;
        this.PenV.setDepth(3);

        this.PenR.setScale(.2)
        this.PenV.setScale(.2)

        this.PenR.visible=false;
        this.PenV.visible=false;
        
        this.scene.input.setDraggable(this);
        this.scene.input.setDraggable(this.PenR);
        this.scene.input.setDraggable(this.PenV);

        this.PenR.setDamping = true;
        this.PenV.setDamping = true;
        this.setDamping = true;
        
        this.on('drag', pointer=> {
            if((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })

        this.PenV.on('drag', pointer=> {
            if((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })

        this.PenR.on('drag', pointer=> {
            if((pointer.x > 50 && pointer.y > 450 && pointer.y < 900 && pointer.x < 1040) && pointer.leftButtonDown()){
                this.x = pointer.x;
                this.y = pointer.y;
                this.PenV.x = this.x;
                this.PenV.y = this.y;
                this.PenR.x = this.x;
                this.PenR.y = this.y;
            }
        })

    }

    // pressed(x)
    // {
    //     this.PenR.on("pointerup", pointer => {
    //         if(this.physics.overlap(this, x)) { //Overlap Documento
    //             this.chara.DenyChar();
    //             console.log("Hay solapeD Deny");

    //       }
    //     })  

    //     this.PenV.on("pointerup", pointer => {
    //         if(this.physics.overlap(this, x)) { //Overlap Documento
    //             this.chara.AcceptChar();
    //             console.log("Hay solapeD Accept");
    //       }
    //     })  
    // }

    setNormal()
    {
        this.States=0; //NORMAL
        this.hasSigned = true;
    }

    setRed()
    {
        this.States=2; //ROJO
        this.hasSigned = false;
    }

    setGreen()
    {
        this.States=1; //VERDE
        this.hasSigned = false;
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