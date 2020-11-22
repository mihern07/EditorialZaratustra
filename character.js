export default class Character extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y, sprite){

        super(scene,x,y, sprite);

        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(.5);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.SPEED = 190;
        const MIDDLE = 540;
        
        //STOP: en el mostrador
        //GOING: desde el spawn
        //ANSWER: al volver, izq. o dcha.
        this.States = {STOP: 0, GOING: 1, ANSWER: 2}; 
        this.currentS = this.States.STOP;
    }

    EnterChar() //Método para que el personaje entre
    {
        if(this.States.GOING)
            this.body.setVelocityX(-this.SPEED);
    }
    StopChar(){ //Método para que el personaje pare
        this.body.setVelocityX(0);
    }
    AcceptChar(){ //Método para que el personaje entre (aceptado)
        if(this.States.STOP)
        {
            this.body.setVelocityX(-this.SPEED);
            this.exists=false;
            this.States = this.States.ANSWER;
        }
    }
    DenyChar() //Método para que el personaje salga (denegado)
    {
        if(this.States.STOP)
        {        
            this.body.setVelocityX(this.SPEED);
            this.exists=false;
            this.States = this.States.ANSWER;
        }
    }

    preUpdate(){

        if(this.States.GOING && this.x < 540){ //Cuando llegue al medio, se detiene el personaje
            this.StopChar();
            this.hasStopped = true;
        }
        if (this.x < 120){ //Cuando salga del campo de vision, por la izquierda, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
        }
        if(this.x > this.firstPosX) //Cuando salga del campo de vision, por la derecha, se le reinicia
        {
            this.StopChar();
            this.x = this.firstPosX;
        }
    }

}