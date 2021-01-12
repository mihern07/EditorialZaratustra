import Clock from "./clock_class.js";
import DeskBell from "./deskbell.js";
import Inkwell from "./inkwell_class.js";
import Board from "./board.js";
import Pen from "./pen.js";
import Events from "./events.js"
import Bodyguard from "./bodyguard.js"
import Alarm from "./alarm.js"
import GameManager from "./gameManager.js";
import Boss from "./boss.js";
import Radio from "./radio.js"
import { sceneConst } from "./constants.js";

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: "main" });
  }
  create() {
    //GLOBAL
    this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.
    let pointer = this.input.activePointer; // Raton.
    //----Prueba de array de diálogos y enum guía
    // let dialogues = ["Dejame pasar, he perdido a mi padre"];
    // const dialoguesEnum = {
    //   PERDIDO = 0,
    // }

    this.sceneKey = 'main';


    //FONDO
    this.bg = this.add.sprite(sceneConst.bgPosX, sceneConst.bgPosY, "background") // Los NPC's solo se ven por encima del bg

    //CLOCK
    this.clock = new Clock(this, sceneConst.clockPosX, sceneConst.clockPosY, "clock", "manecilla"); //Inicializa reloj
    this.clock.start(this.handleTimeFinished.bind(this), sceneConst.timeSceneEnds);

    //FOREGROUND(MESA)
    this.fg = this.add.sprite(sceneConst.fgPosX, sceneConst.fgPosY, "foreground");

    this.gameManager = new GameManager();
    // Determinar el numero minimo de ingresos necesarios para ganar el nivel y el numero de strikes hasta el game over
    this.gameManager.setGameOver(sceneConst.firstLevelWinCondition, sceneConst.firstLevelLooseCondition);

    //BOARD(CORCHO)
    this.Board = new Board(this, sceneConst.boardPosX, sceneConst.boardPosY, sceneConst.boardNumPostIts, "board")

    //TINTEROS

    console.log(sceneConst.greenInkwellPosX + " " + sceneConst.inkwellPosY);
    this.tinteroVerde = new Inkwell(this, sceneConst.greenInkwellPosX, sceneConst.inkwellPosY, "tinteroV"); //Inicializa tintero verde

    this.tinteroRojo = new Inkwell(this, sceneConst.redInkwellPosX, sceneConst.inkwellPosY, "tinteroR"); //Inicializa tintero rojo

    //CALENDARIO
    this.calendar = this.add.sprite(sceneConst.calendarPosX, sceneConst.calendarPosY, "calendarOriginal");
    this.calendar.setScale(sceneConst.calendarScale)

    //PLUMA

    this.pen = new Pen(this, sceneConst.penPosX, sceneConst.penPosY, "pen");

    this.bg.setDepth(-2); //MOVER A FONDO Para que el fondo se dibuje detrás del todo

    //Info del libro
    this.bookInfo = {
      novelaBien: sceneConst.firstLevelNovelG,
      poesiaBien: sceneConst.firstLevelPoetryG,
      teatroBien: sceneConst.firstLevelTheatreG,
      novelaMal: sceneConst.firstLevelNovelB,
      poesiaMal: sceneConst.firstLevelPoetryB,
      teatroMal: sceneConst.firstLevelTheatreB,
      everyCategory: sceneConst.everyCategory,
      numPagsBien: [sceneConst.thickBook, sceneConst.thinBook], // libro corto y largo
      numPagsMal: [sceneConst.normalBook] // libro mediano
    }

    this.noticiaInfo = {
      noticiaBien: sceneConst.firstLevelNoticiaG,
      noticiaMal: sceneConst.firstLevelNoticiaB
    }

    //En algun punto seran constantes
    this.order = {
      numCorrects: sceneConst.firstLevelCorrects, // Número mínimo de libros correctos 
      minBooks: sceneConst.firstLevelMinCor, // Número mínimo de libros entre los que se encuentran los anteriores
      specialChara: sceneConst.firstLevelSpecialChara // perosnajes especiales del nivel
    }
    this.events = new Events(this, sceneConst.eventsPosX, sceneConst.eventsPosY, "character", "box", "book", "book2", "document", this.bookInfo, this.noticiaInfo,
      this.order, this.gameManager, sceneConst.firstDay, sceneConst.month, sceneConst.year);

    //DESKBELL
    this.bellSound = this.sound.add("deskbellSound");
    this.bell = new DeskBell(this, sceneConst.bellPosX, sceneConst.bellPosY, "deskBellSP", "deskBellPressed", this.events, this.bellSound); //Inicializa timbre

    //SEGURIDAD

    this.bodyguard = new Bodyguard(this, sceneConst.guardPosX, sceneConst.guardPosY, "bodyguard", this.events) //Inicializa bodyguard

    //BOSS
    this.dialogoJefe = this.cache.text.get("jefe");
    this.dialogoJefe = this.dialogoJefe.split("\n");
    this.boss = new Boss(this, sceneConst.bossPosX, sceneConst.bossPosY, "bodyguard", this.dialogoJefe, "box", 0, 4, this.bookInfo, this.noticiaInfo);

    //ALARMA

    this.alarm = new Alarm(this, sceneConst.alarmPosX, sceneConst.alarmPosY, "alarmOff", this.bodyguard, this.events); //Inicializa alarma.

    //Radio
    this.radio = new Radio(this, sceneConst.radioPosX, sceneConst.radioPosY, "radio", this.events, this.bookInfo, this.noticiaInfo);

    this.radioClock = new Clock(this, 0, 0, "clock", "manecilla");
    this.radioClock.visible = false;
    this.radioActivationTime = this.getRndInteger(sceneConst.offSetBtwRadio, sceneConst.timeSceneEnds / 2);
    this.radioClock.start(this.activateRadio.bind(this), this.radioActivationTime);

    this.Intro();

    this.music = this.sound.add("music"); //Música manejable
    this.music.play();
    this.isPlaying = true;

    this.boss.EnterChar(); //Entrada el Boss

    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  activateRadio(){
    this.radio.setActive(this.events.getBookMalRadio(), this.events.getNoticiaMalRadio());
  }

  handleTimeFinished() {
    if (this.gameManager.isCleared())
      this.scene.start('victoryScene', this.gameManager)
    else
      this.scene.start('gameOverScene', this.gameManager);
  }

  update(time, delta) {
    if (!this.gameManager.isGameOver()) { // Comprueba si no se han recibido los strikes minimos
      if (this.keyEsc.isDown) {
        this.keyEsc.reset();
        this.game.scene.pause(this);
        this.scene.launch('pause', {
          "music": this.music, 
          "playing": this.isPlaying,
          "key": this.sceneKey
        });
      }

      this.events.update(); // No preUpdate porque no existe si hereda de GameObject

      if (this.physics.overlap(this.pen, this.tinteroRojo)) { //Overlap Rojo
        this.pen.setRed();
      }

      if (this.physics.overlap(this.pen, this.tinteroVerde)) { //Overlap Verde
        this.pen.setGreen();
      }

      // this.pen.changeColor();

      this.pen.on("pointerup", pointer=>{
        if (this.pen.isRed() && 
            !this.pen.hasSigned && 
            this.physics.overlap(this.pen, this.events.chara.document)) { //Overlap Documento Pluma Roja
          
          this.events.DenyChar();
          this.pen.setNormal();
        }
        else if(this.pen.isGreen() && 
              !this.pen.hasSigned && 
              this.physics.overlap(this.pen, this.events.chara.document)){

          this.events.AcceptChar();
          this.pen.setNormal();
        }
      })

    }
    else {
      this.scene.start('gameOverScene', this.gameManager);
    }
  }

  Intro() {
    this.cameras.main.fadeIn(2000, 0, 0, 0);
    //this.createParticles("paperParticle");
  }

  createParticles(particleSprite) {
    //Particles
    let leaves = this.add.particles(particleSprite);
    leaves.createEmitter({
      frames: [{ key: particleSprite, frame: 0 }],
      x: { min: 100, max: this.game.config.width },
      y: -50,
      speedX: { min: -50, max: 50 },
      speedY: { min: 100, max: 120 },
      lifespan: 7000,
      scale: { start: 0.1, end: 0.01 },
      rotate: { start: 0, end: 120 },
      frequency: 300
    });
  }

  //
  bossFinished() {
    this.bell.startWork();
  }

  getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}