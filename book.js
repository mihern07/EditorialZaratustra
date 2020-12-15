export default class Book extends Phaser.GameObjects.Sprite {

    /** @type {Phaser.Scene} */
    scene

    // /** @type {Phaser.GameObjects.Sprite} */
    // Libro

    /** @type {Phaser.GameObjects.Sprite} */
    Libro2

    constructor(scene, x, y, sprite, sprite2, genre, category, numPags) {
        super(scene, x, y, sprite)
        this.firstPosX = this.x;
        this.firstPosY = this.y;

        this.scene = scene;

        this.visible = false;


        this.setScale(.3);
        this.setDepth(2);
        //Lo añade a la escena
        scene.add.existing(this);

        //Permite interactuar con él
        this.setInteractive({ draggable: true, dropZone: true });

        //Sprite ibro abierto
        this.Libro2 = scene.add.sprite(this.x, this.y, sprite2).setInteractive();
        this.Libro2.setScale(1.7);
        this.Libro2.visible = false;

        this.Libro2.x = this.scene.game.config.width / 2;
        this.Libro2.y = this.scene.game.config.height / 2;
        this.Libro2.setDepth(4);
       
        this.info = [scene.add.text(this.x - 250, this.y - 400, genre, { color: 0x0A0A0A }),
                    scene.add.text(this.x - 250, this.y - 375, category, { color: 0x0A0A0A }),
                    scene.add.text(this.x - 250, this.y - 350, numPags + " pags", { color: 0x0A0A0A })]; //Añadimos texto. (cambiar numeros por globales)

        for (let i = 0; i < this.info.length; i++) {
            this.info[i].visible = false;
            this.info[i].setDepth(4);
        }

        //Configuración del Drag        
        //this.bound = new Phaser.Geom.Rectangle(100, 100, 500, 400);
        //this.body.setBoundsRectangle(this.bound);

        this.on('drag', pointer => {
            if ((pointer.x > 50
                && pointer.y > 450
                && pointer.y < 900
                && pointer.x < 1040)
                && pointer.leftButtonDown()) {

                this.x = pointer.x;
                this.y = pointer.y;

            }
        })

        //Cuando es pulsado dicho sprite...
        this.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.visible = !this.visible;
                this.Libro2.visible = !this.Libro2.visible;

                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })

        this.Libro2.on("pointerdown", pointer => {
            //hacer algo.
            if (pointer.rightButtonDown()) {
                console.log("Libro pulsado");
                this.visible = !this.visible;
                this.Libro2.visible = !this.Libro2.visible;
                for (let i = 0; i < this.info.length; i++) {
                    this.info[i].visible = !this.info[i].visible;
                }
            }
        })
    }
    cerrarSprites() {
        this.visible = false;
        this.Libro2.visible = false;
    }

    resetPos() {
        this.x = this.firstPosX;
        this.y = this.firstPosY;
        this.Libro2.x = this.firstPosX;
        this.Libro2.y = this.firstPosY;
    }
}