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
import { sceneConst } from "./constants.js";

export default class Game extends Phaser.Scene {

  constructor(keyS, levelManager, data) {
    super(keyS);
    this.levelManager = levelManager;
    this.dataM = data;
  }
  create() {

    this.sceneKey = this.scene.key;

    console.log("Creado nivel: " + this.sceneKey);
    //GLOBAL
    //this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.
   
    //FONDO
    this.bg = this.add.sprite(sceneConst.bgPosX, sceneConst.bgPosY, "background") // Los NPC's solo se ven por encima del bg

    //CLOCK
    if(this.dataM.clock){
      this.clock = new Clock(this, sceneConst.clockPosX, sceneConst.clockPosY, "clock", "manecilla"); //Inicializa reloj
      this.clock.start(this.handleTimeFinished.bind(this), '180000');
    }
    //FOREGROUND(MESA)
    this.fg = this.add.sprite(sceneConst.fgPosX, sceneConst.fgPosY, "foreground");

    this.gameManager = new GameManager();
    // Determinar el numero minimo de ingresos necesarios para ganar el nivel y el numero de strikes hasta el game over
    this.gameManager.setGameOver(sceneConst.firstLevelWinCondition, sceneConst.firstLevelLooseCondition);

    //BOARD(CORCHO)
    if(this.dataM.board)
      this.Board = new Board(this, sceneConst.boardPosX, sceneConst.boardPosY, sceneConst.boardNumPostIts, "board")

    //TINTEROS

    //console.log(sceneConst.greenInkwellPosX + " " + sceneConst.inkwellPosY);
    this.tinteroVerde = new Inkwell(this, sceneConst.greenInkwellPosX, sceneConst.inkwellPosY, "tinteroV"); //Inicializa tintero verde

    this.tinteroRojo = new Inkwell(this, sceneConst.redInkwellPosX, sceneConst.inkwellPosY, "tinteroR"); //Inicializa tintero rojo

    //CALENDARIO
    if(this.dataM.calendar){
      this.calendar = this.add.sprite(sceneConst.calendarPosX, sceneConst.calendarPosY, "calendarOriginal");
      this.calendar.setScale(sceneConst.calendarScale);
    }
    
    //PLUMA
    this.pen = new Pen(this, sceneConst.penPosX, sceneConst.penPosY, "pen");

    //Preparación de los archivos de texto
    let dialogoJefe = this.cache.text.get("jefe");
    dialogoJefe = dialogoJefe.split("\n");
    let dialogoNinio = this.cache.text.get("ninio");
    dialogoNinio = dialogoNinio.split("\n");
    let dialogoTendencias = this.cache.text.get("tendencias");
    dialogoTendencias = dialogoTendencias.split("\n");
    let dialogoCorreos = this.cache.text.get("correos");
    dialogoCorreos = dialogoCorreos.split("\n");
    let dialogoCorreosFalso = this.cache.text.get("correosFalso");
    dialogoCorreosFalso = dialogoCorreosFalso.split("\n");
    let dialogoMujerDelJefe = this.cache.text.get("mujerDelJefe");
    dialogoMujerDelJefe = dialogoMujerDelJefe.split("\n");
    let dialogoMujerDelJefeFalsa = this.cache.text.get("mujerdelJefeFalsa");
    dialogoMujerDelJefeFalsa = dialogoMujerDelJefeFalsa.split("\n");
    let dialogoSobornador = this.cache.text.get("sobornador");
    dialogoSobornador = dialogoSobornador.split("\n");
    let dialogoVagabundo = this.cache.text.get("vagabundo");
    dialogoVagabundo = dialogoVagabundo.split("\n");
    let dialogoBase = this.cache.text.get("dialogoBase");
    dialogoBase = dialogoBase.split("\n");

    this.bg.setDepth(-2); //MOVER A FONDO Para que el fondo se dibuje detrás del todo

    this.events = new Events(this, sceneConst.eventsPosX, sceneConst.eventsPosY, "character", dialogoJefe, dialogoNinio, dialogoTendencias,
            dialogoCorreos, dialogoCorreosFalso, dialogoMujerDelJefe, dialogoMujerDelJefeFalsa,
            dialogoSobornador, dialogoVagabundo, dialogoBase, "box", "book", "book2", "document", this.dataM.bookInfo, this.dataM.noticiaInfo,
            this.dataM.order, this.gameManager, sceneConst.firstDay, sceneConst.month, sceneConst.year);
    
    //DESKBELL
    if(this.dataM.deskbell){
      this.bellSound = this.sound.add("deskbellSound");
      this.bell = new DeskBell(this, sceneConst.bellPosX, sceneConst.bellPosY, "deskBellSP", "deskBellPressed", this.events, this.bellSound); //Inicializa timbre
    }
    //SEGURIDAD
    if(this.dataM.bodyguard)
      this.bodyguard = new Bodyguard(this, sceneConst.guardPosX, sceneConst.guardPosY, "bodyguard", this.events) //Inicializa bodyguard

    //BOSS
    this.boss = new Boss(this, sceneConst.bossPosX, sceneConst.bossPosY, "bodyguard", dialogoJefe, "box", 0, 4, this.dataM.bookInfo);

    //ALARMA
    if(this.dataM.alarm)
      this.alarm = new Alarm(this, sceneConst.alarmPosX, sceneConst.alarmPosY, "alarmOff", this.bodyguard, this.events); //Inicializa alarma.

    this.Intro();

    this.music = this.sound.add("music"); //Música manejable
    this.music.play();
    this.isPlaying = true;

    this.boss.EnterChar(); //Entrada el Boss

    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyReset = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
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
        this.game.scene.sleep(this);
        this.scene.launch('pause', {
          music: this.music, 
          playing: this.isPlaying,
          key: this.sceneKey
        });
      }

      if(this.keyReset.isDown){
        this.keyReset.reset();
        this.levelManager.nextLevel();
        this.music.stop();
        this.scene.stop();
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

}