export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: "boot" });
    }
    preload() { //Carga de sprites
        this.load.image("background", "sprites/background.png") //Fondo = background
        this.load.image("foreground", "sprites/foreground.png") //Mesa = foreground
        this.load.image("book", "sprites/librocerrado.png"); //Libro cerrado = book
        this.load.image("book2", "sprites/libroabierto.png"); //libro abierto = book2
        this.load.image("clock", "sprites/clockprototype.png"); //Reloj = clock
        this.load.image("manecilla", "sprites/manecilla.png"); //Manecilla = manecilla
        this.load.image("box", "sprites/dialogueboxv2.0.png"); //Bocadillo = box
        this.load.image("character", "sprites/personaje.png"); //personaje = character
        this.load.image("deskBellPressed", "sprites/timbrepulsado.png"); //timbre pulsado = deskBellPressed
        this.load.spritesheet("deskBellSP", "sprites/timbresheet.png", { frameWidth: 385, frameHeight: 356 }); //timbre = deskBellSP
        this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
        this.load.image("tinteroR", "sprites/tinteroRojo.png"); // tintero rojo = tinteroR
        this.load.image("document", "sprites/documento.png");
        this.load.image("pen", "sprites/pen.png");
        this.load.image("penV", "sprites/penGreen.png");
        this.load.image("penR", "sprites/penRed.png");
        this.load.image("board", "sprites/board.png"); // Board
        this.load.image("postIt", "sprites/postitBlanco.png"); // PostIt
        this.load.image("calendarOriginal", "sprites/calendar31_04.png");
        this.load.image("paperParticle", "sprites/paperParticle.png");
        this.load.image("bodyguard", "sprites/guardaespaldas.png"); //Guardaespaldas = bodyguard
    
        //Sprites de los diferentes libros
        this.load.image("libroCHistórico", "sprites/libro_cerrado_historia.png")
        this.load.image("libroAHistórico", "sprites/libro_abierto_historia.png")
        this.load.image("libroCAcadémico", "sprites/libro_cerrado_academico.png");
        this.load.image("libroAAcadémico", "sprites/libro_abierto_academico.png");
        this.load.image("libroCAventura", "sprites/libro_cerrado_aventura.png");
        this.load.image("libroAAventura", "sprites/libro_abierto_aventura.png");
        this.load.image("libroCComedia", "sprites/libro_cerrado_comedia.png");
        this.load.image("libroAComedia", "sprites/libro_abierto_comedia.png");
        this.load.image("libroCDrama", "sprites/libro_cerrado_drama.png");
        this.load.image("libroADrama", "sprites/libro_abierto_drama.png");
        this.load.image("libroCFantasía", "sprites/libro_cerrado_fantasia.png");
        this.load.image("libroAFantasía", "sprites/libro_abierto_fantasia.png");
        this.load.image("libroCFicción", "sprites/libro_cerrado_ficcion.png");
        this.load.image("libroAFicción", "sprites/libro_abierto_ficcion.png");
        this.load.image("libroCPolicíaco", "sprites/libro_cerrado_policiaco.png");
        this.load.image("libroAPolicíaco", "sprites/libro_abierto_policiaco.png");
        this.load.image("libroCRomance", "sprites/libro_cerrado_romance.png");
        this.load.image("libroARomance", "sprites/libro_abierto_romance.png");
        this.load.image("libroCSuspense", "sprites/libro_cerrado_suspense.png");
        this.load.image("libroASuspense", "sprites/libro_abierto_suspense.png");
    
        this.load.text("jefe", "dialogue/jefe.txt");
        this.load.text("ninio", "dialogue/ninio.txt");
        this.load.text("tendencias", "dialogue/personaje_tendencias.txt");
        this.load.text("correos", "dialogue/correos.txt");
        this.load.text("correosFalso", "dialogue/correos.txt");
        this.load.text("mujerDelJefe", "dialogue/mujer_del_jefe.txt");
        this.load.text("mujerdelJefeFalsa", "dialogue/mujer_del_jefe.txt");
        this.load.text("sobornador", "dialogue/sobornador.txt");
        this.load.text("vagabundo", "dialogue/vagabundo.txt");
        this.load.text("dialogoBase", "dialogue/dialogoBase.txt");
    
        this.load.audio("deskbellSound", "sounds/deskbell.wav"); //Audio timbre
        this.load.audio("npcSound","sounds/npc.wav");
        this.load.audio("music","sounds/music.wav");
      }

      create(){
        this.scene.start('titleScene');
      }
}