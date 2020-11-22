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
        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = {INI: 0, GOING: 1, SHOW: 2, ANSWER: 3}; 
        this.currentS = this.States.INI;
    }

    EnterChar(){ //Método para que el personaje entre
        if(this.currentS === this.States.INI){
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    StopChar(){ //Método para que el personaje pare
        if(this.currentS === this.States.GOING){
            this.body.setVelocityX(0);
            this.currentS = this.States.SHOW;
        }
        else if(this.currentS === this.States.ANSWER){
            this.body.setVelocityX(0);
            this.currentS = this.States.INI;
        }
    }

    AcceptChar(){ //Método para que el personaje entre (aceptado)
        if(this.currentS === this.States.SHOW){
            this.body.setVelocityX(-this.SPEED);
            this.currentS = this.States.ANSWER;
        }
    }

    DenyChar() //Método para que el personaje salga (denegado)
    {
        if(this.currentS === this.States.SHOW){
            this.body.setVelocityX(this.SPEED);
            this.currentS = this.States.ANSWER;
        }
    }

    preUpdate(){

        if(this.currentS === this.States.GOING && this.x < 540){ //Cuando llegue al medio, se detiene el personaje
            this.StopChar();

        }
        else if (this.currentS === this.States.ANSWER && this.x < 120){ //Cuando salga del campo de vision, por la izquierda, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
        }
        else if(this.currentS === this.States.ANSWER && this.x > this.firstPosX){ //Cuando salga del campo de vision, por la derecha, se le reinicia
            this.StopChar();
            this.x = this.firstPosX;
        }
    }

}