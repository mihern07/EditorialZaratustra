export default class Character extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y, sprite){

        super(scene,x,y, sprite);

        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(.5);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);
        this.hasStopped = false; //Creamos variable booleana hasStopped (saber si esta parado)
        this.exists=false; //Creamos variable booleana exists (no permite dar mas de 1 instruccion al personaje)
    }

    EnterChar() //Método para que el personaje entre
    {
        if(!this.exists && !this.hasStopped)
        this.body.setVelocityX(-190);
    }
    StopChar(){ //Método para que el personaje pare
        this.body.setVelocityX(0);
    }
    AcceptChar(){ //Método para que el personaje entre (aceptado)
        if(this.exists)
        {
        this.body.setVelocityX(-190);
        this.exists=false;
        }
    }
    DenyChar() //Método para que el personaje salga (denegado)
    {
        if(this.exists)
        {        
            this.body.setVelocityX(190);
            this.exists=false;
        }
    }
    

    preUpdate(){

        if(!this.hasStopped && this.x < 540){ //Cuando llegue al medio, se detiene el personaje
            this.StopChar();
            this.hasStopped = true;
            this.exists=true;
        }
        if (this.x < 120){ //Cuando salga del campo de vision, por la izquierda, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
            this.hasStopped = false;
        }
        if(this.hasStopped && this.x>this.firstPosX) //Cuando salga del campo de vision, por la derecha, se le reinicia
        {
            this.StopChar();
            this.x = this.firstPosX;
            this.hasStopped = false;
        }
    }

}