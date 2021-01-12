export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: "boot" });
    }
    preload() { //Carga de sprites
        this.load.image("background", "sprites/backgroundSprite.png") //Fondo = background
        this.load.image("foreground", "sprites/foregroundSprite.png") //Mesa = foreground
        this.load.image("book", "sprites/libroCerradoSprite.png"); //Libro cerrado = book
        this.load.image("book2", "sprites/libroAbiertoSprite.png"); //libro abierto = book2
        this.load.image("clock", "sprites/clockPrototypeSprite.png"); //Reloj = clock
        this.load.image("manecilla", "sprites/manecilla.png"); //Manecilla = manecilla
        this.load.image("box", "sprites/dialogueBoxv2.png"); //Bocadillo = box
        this.load.image("character", "sprites/personajeSprite.png"); //personaje = character
        this.load.image("deskBellPressed", "sprites/timbrePulsadoSprite.png"); //timbre pulsado = deskBellPressed
        this.load.image("deskBellSP", "sprites/timbreSprite.png"); //timbre = deskBellSP
        this.load.image("tinteroV", "sprites/tintero.png"); //tintero verde = tinteroV
        this.load.image("tinteroR", "sprites/tinteroRojo.png"); // tintero rojo = tinteroR
        this.load.image("document", "sprites/documentoSprite.png");
        this.load.image("pen", "sprites/penSprite.png");
        this.load.image("penV", "sprites/penGreenSprite.png");
        this.load.image("penR", "sprites/penRedSprite.png");
        this.load.image("board", "sprites/boardSprite.png"); // Board
        this.load.image("postIt", "sprites/postItBlancoSprite.png"); // PostIt
        this.load.image("calendarOriginal", "sprites/calendar31_04.png");
        this.load.image("paperParticle", "sprites/paperParticle.png");
        this.load.image("bodyguard", "sprites/guardaespaldas.png"); //Guardaespaldas = bodyguard
        this.load.image("littleNewspaper", "sprites/littleNewspaper.png");
        this.load.image("bigNewspaper", "sprites/bigNewspaperRaw.png");
        this.load.image("rules", "sprites/rules.png");
        this.load.image("openedRules", "sprites/opened_rules.png");
        this.load.image("volume","sprites/volumen.png");
        this.load.image("radio", "sprites/radio.png");
        this.load.image("radioActiveButton", "sprites/radioActive.png");
        this.load.image("radioNotActiveButton", "sprites/radioDeactivated.png");
        this.load.image("alarmPressed","sprites/alarmaEncendidaPulsada.png");
        this.load.image("alarmNoPressed","sprites/alarmaEncendidaSinPulsar.png");
        this.load.image("alarmOff","sprites/alarmaApagadaSinPulsar.png");
    
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

        //Sprites de los diferentes postits
        this.load.image("historicoPost", "sprites/postit_historico.png")
        this.load.image("academicoPost", "sprites/postit_academico.png");
        this.load.image("aventuraPost", "sprites/postit_aventura.png");
        this.load.image("comediaPost", "sprites/postit_comedia.png");
        this.load.image("dramaPost", "sprites/postit_drama.png");
        this.load.image("fantasiaPost", "sprites/postit_fantasia.png");
        this.load.image("ficcionPost", "sprites/postit_ficcion.png");
        this.load.image("policiacoPost", "sprites/postit_policiaco.png");
        this.load.image("romancePost", "sprites/postit_romance.png");
        this.load.image("suspensePost", "sprites/postit_suspense.png");
    
        this.load.text("jefe", "dialogue/jefe.txt");
        this.load.text("ninio", "dialogue/ninioText.txt");
        this.load.text("tendencias", "dialogue/personaje_tendencias.txt");
        this.load.text("correos", "dialogue/correosText.txt");
        this.load.text("correosFalso", "dialogue/correosText.txt");
        this.load.text("mujerDelJefe", "dialogue/mujer_del_jefe.txt");
        this.load.text("mujerdelJefeFalsa", "dialogue/mujer_del_jefe.txt");
        this.load.text("sobornador", "dialogue/sobornadorText.txt");
        this.load.text("vagabundo", "dialogue/vagabundoText.txt");
        this.load.text("dialogoBase", "dialogue/dialogoBase.txt");
        this.load.text("noticiasBase", "dialogue/noticiasBase.txt");
    
        this.load.audio("deskbellSound", "sounds/deskbell.wav"); //Audio timbre
        this.load.audio("npcSound","sounds/npc.wav");
        this.load.audio("music","sounds/music.wav");
        this.load.audio("alarm","sounds/alarm.wav");

        // Codigo para usar webfonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
      }

      create(){
        // Webfonts que se van a utilizar
        WebFont.load({
          google: {
              families: ['Yeon Sung',  'Dancing Script', 'Barlow Condensed', 'Lobster']
          },
        });

        this.scene.start('titleScene');
      }
}