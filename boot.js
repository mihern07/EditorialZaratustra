export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" });
  }
  preload() { //Carga de sprites
    // Menu Principal
    this.load.image('title', 'sprites/logoBien.png');
    this.load.image('anim', 'sprites/anim.png');
    this.load.image('anim2', 'sprites/anim2.png');

    // Menu Pausa
    this.load.image('menu', 'sprites/menu.png');
    this.load.image('volume', 'sprites/volumen.png');
    this.load.image('volume2', 'sprites/volumen2.png')
    this.load.image('noVolume', 'sprites/novolumen.png')
    this.load.image('noVolume2', 'sprites/novolumen2.png')
    this.load.image('continue', 'sprites/continuar.png');
    this.load.image('continue2', 'sprites/continuar2.png');
    this.load.image('exit', 'sprites/salir.png');
    this.load.image('exit2', 'sprites/salir2.png');

    // Intro
    this.load.text("intro", "dialogue/storyIntro.txt");
    this.load.image("street", "sprites/street.jpg");
    this.load.image("fondo", "sprites/negro_semitransparente.png");

    //Nivel
    this.load.image("background", "sprites/backgroundSprite.png") 
    this.load.image("foreground", "sprites/foregroundSprite.png") 
    this.load.image("clock", "sprites/clockPrototypeSprite.png"); 
    this.load.image("manecilla", "sprites/manecilla.png");
    this.load.image("box", "sprites/dialogueBoxv2.png"); 
    this.load.image("radioBox", "sprites/dialogueBoxRadio.png");
    this.load.image("deskBellPressed", "sprites/timbrePulsadoSprite.png");
    this.load.image("deskBellSP", "sprites/timbreSprite.png");
    this.load.image("tinteroV", "sprites/tintero.png");
    this.load.image("tinteroR", "sprites/tinteroRojo.png");
    this.load.image("document", "sprites/documentoSprite.png");
    this.load.image("pen", "sprites/penSprite.png");
    this.load.image("board", "sprites/boardSprite.png");
    this.load.image("postIt", "sprites/postItBlancoSprite.png");
    this.load.image("paperParticle", "sprites/paperParticle.png");
    this.load.image("littleNewspaper", "sprites/littleNewspaper.png");
    this.load.image("bigNewspaper", "sprites/bigNewspaperRaw.png");
    this.load.image("rules", "sprites/rules.png");
    this.load.image("openedRules", "sprites/opened_rules.png");
    this.load.image("volume", "sprites/volumen.png");
    this.load.image("radio", "sprites/radio.png");
    this.load.image("radioActiveButton", "sprites/radioActive.png");
    this.load.image("radioNotActiveButton", "sprites/radioDeactivated.png");
    this.load.image("alarmPressed", "sprites/alarmaEncendidaPulsada.png");
    this.load.image("alarmNoPressed", "sprites/alarmaEncendidaSinPulsar.png");
    this.load.image("alarmOff", "sprites/alarmaApagadaSinPulsar.png");

    // Calendarios
    this.load.image("calendar14", "sprites/calendar14.png");
    this.load.image("calendar24", "sprites/calendar24.png");
    this.load.image("calendar34", "sprites/calendar34.png");
    this.load.image("calendar44", "sprites/calendar44.png");
    this.load.image("calendar54", "sprites/calendar54.png");
    this.load.image("calendar64", "sprites/calendar64.png");
    this.load.image("calendar74", "sprites/calendar74.png");

    this.load.image("bodyguardSprite", "sprites/guardiaPsje.png"); //Sprite Guardaespaldas
    this.load.image("bossSprite", "sprites/jefePsje.png"); //Sprite Jefe
    this.load.image("sobornador", "sprites/sobornador.png"); //Sprite Sobornador
    this.load.image("bossWife", "sprites/mujerJefe.png"); //Sprite Mujer del Jefe
    this.load.image("cartero", "sprites/correos.png"); //Sprite Correos
    this.load.image("boy", "sprites/ninio.png"); //Sprite Niño
    this.load.image("tend", "sprites/tendencias.png"); //Sprite Tendencias
    this.load.image("vagabundo", "sprites/vagabundo.png"); //Sprite Vagabundo

    //Sprites Cabezas
    this.load.image("head1", "sprites/cabeza1.png");
    this.load.image("head2", "sprites/cabeza2.png");
    this.load.image("head3", "sprites/cabeza3.png");
    this.load.image("head4", "sprites/cabeza4.png");
    this.load.image("head5", "sprites/cabeza5.png");

    //Sprites Pelos
    this.load.image("hair1", "sprites/pelo1.png");
    this.load.image("hair2", "sprites/pelo2.png");
    this.load.image("hair3", "sprites/pelo3.png");
    this.load.image("hair4", "sprites/pelo4.png");
    this.load.image("hair5", "sprites/pelo5.png");
    this.load.image("hair6", "sprites/pelo6.png");
    this.load.image("hair7", "sprites/pelo7.png");
    this.load.image("hair8", "sprites/pelo8.png");

    //Sprites Ropa
    this.load.image("clothes1", "sprites/ropa1.png");
    this.load.image("clothes2", "sprites/ropa2.png");
    this.load.image("clothes3", "sprites/ropa3.png");
    this.load.image("clothes4", "sprites/ropa4.png");
    this.load.image("clothes5", "sprites/ropa5.png");
    this.load.image("clothes6", "sprites/ropa6.png");
    this.load.image("clothes7", "sprites/ropa7.png");

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

    //Dialogos
    this.load.text("jefe", "dialogue/jefe.txt");
    this.load.text("ninio", "dialogue/ninioText.txt");
    this.load.text("tendencias", "dialogue/personaje_tendencias.txt");
    this.load.text("correos", "dialogue/correosText.txt");
    this.load.text("correosMal", "dialogue/correosMalText.txt");
    this.load.text("mujerDelJefe", "dialogue/mujer_del_jefe.txt");
    this.load.text("mujerDelJefeMal", "dialogue/mujer_del_jefe_mal.txt");
    this.load.text("sobornador", "dialogue/sobornadorText.txt");
    this.load.text("vagabundo", "dialogue/vagabundoText.txt");
    this.load.text("dialogoBase", "dialogue/dialogoBase.txt");
    this.load.text("dialogoBaseAmigable", "dialogue/dialogoBaseAmigable.txt");
    this.load.text("dialogoBaseMalEducado", "dialogue/dialogoBaseMalEducado.txt");
    this.load.text("dialogoBasePijo", "dialogue/dialogoBasePijo.txt");
    this.load.text("dialogoBaseResponsable", "dialogue/dialogoBaseResponsable.txt");
    this.load.text("dialogoBaseTimido", "dialogue/dialogoBaseTimido.txt");
    this.load.text("noticiasBase", "dialogue/noticiasBase.txt");
    this.load.text("noticiasAmigable", "dialogue/noticiasAmigable.txt");
    this.load.text("noticiasMalEducado", "dialogue/noticiasMalEducado.txt");
    this.load.text("noticiasPijo", "dialogue/noticiasPijo.txt");
    this.load.text("noticiasResponsable", "dialogue/noticiasResponsable.txt");
    this.load.text("noticiasTimido", "dialogue/noticiasTimido.txt");
    this.load.text("jefeColores", "dialogue/jefeColores.txt");
    this.load.text("jefeGuardia", "dialogue/jefeGuardia.txt");
    this.load.text("jefeNoticia", "dialogue/jefeNoticia.txt");
    this.load.text("jefeRadio", "dialogue/jefeRadio.txt");

    //Audio 
    this.load.audio("deskbellSound", "sounds/deskbell.wav");
    this.load.audio("npcSound", "sounds/npc.wav");
    this.load.audio("music", "sounds/music.wav");
    this.load.audio("alarm", "sounds/alarm.wav");
    this.load.audio("pageSound", "sounds/page.wav");
    this.load.audio("ink", "sounds/inkSound.wav");
    this.load.audio("sign", "sounds/write.wav");
    this.load.audio("ink1", "sounds/gota1.wav");
    this.load.audio("ink2", "sounds/gota2.wav");
    this.load.audio("ink3", "sounds/gota3.wav");
    this.load.audio("ink4", "sounds/gota4.wav");
    this.load.audio("ink5", "sounds/gota5.wav");
    this.load.audio("incorrectSound", "sounds/incorrect.wav");
    this.load.audio("sonidoRadio", "sounds/radioSound.mp3");

    //Escena Game Over
    this.load.image("street", "sprites/street.jpg");
    this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");

    //Escena Victoria
    this.load.image("pesetas", "sprites/pesetas.jpg");
    this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");

    // Escena Final
    this.load.text("introEnd", "dialogue/ricardoDialogue.txt");
    this.load.text("end1", "dialogue/dontSpyEnding.txt");
    this.load.text("end2", "dialogue/spyEnding.txt");
    this.load.image("street", "sprites/street.jpg");
    this.load.image("fondo", "sprites/negro_semitransparente.png");
    this.load.image("buttonNotPressed", "sprites/buttonNotPressed.png");

    //Escena Créditos
    this.load.image("title1", "sprites/title.png");
    this.load.image("creditsBG", "sprites/creditbg.png");

    // Codigo para usar webfonts
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create() {
    // Webfonts que se van a utilizar
    WebFont.load({
      google: {
        families: ['Yeon Sung', 'Dancing Script', 'Barlow Condensed', 'Lobster']
      },
    });

    this.scene.start('titleScene');
  }
}