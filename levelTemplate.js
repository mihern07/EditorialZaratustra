import PauseMenu from "./pauseMenu.js"
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

export default class LevelTemplate extends Phaser.Scene {

  constructor(keyS, levelManager, data) {
    super(keyS);
    this.levelManager = levelManager;
    this.dataM = data;
  }
  create() {

    this.sceneKey = this.scene.key;
    console.log("Creado nivel: " + this.sceneKey);

    //FONDO
    this.bg = this.add.sprite(sceneConst.bgPosX, sceneConst.bgPosY, "background") // Los NPC's solo se ven por encima del bg
    this.bg.setDepth(-2); //Mover a fondo para se dibuje detrás

    //CLOCK
    if (this.dataM.clock) {
      this.clock = new Clock(this, sceneConst.clockPosX, sceneConst.clockPosY, "clock", "manecilla"); //Inicializa reloj
    }
    //FOREGROUND(MESA)
    this.fg = this.add.sprite(sceneConst.fgPosX, sceneConst.fgPosY, "foreground");

    this.gameManager = new GameManager();
    // Determinar el numero minimo de ingresos necesarios para ganar el nivel y el numero de strikes hasta el game over
    this.gameManager.setGameOver(this.dataM.winCondition, this.dataM.loseCondition);

    //BOARD(CORCHO)
    if (this.dataM.board)
      this.board = new Board(this, sceneConst.boardPosX, sceneConst.boardPosY, sceneConst.boardNumPostIts, "board")

    //TINTEROS
    this.tinteroVerde = new Inkwell(this, sceneConst.greenInkwellPosX, sceneConst.inkwellPosY, "tinteroV"); //Inicializa tintero verde

    this.tinteroRojo = new Inkwell(this, sceneConst.redInkwellPosX, sceneConst.inkwellPosY, "tinteroR"); //Inicializa tintero rojo

    //CALENDARIO
    if (this.dataM.calendar) {
      this.calendar = this.add.sprite(sceneConst.calendarPosX, sceneConst.calendarPosY, "calendar" + this.dataM.day + this.dataM.month);
      this.calendar.setScale(sceneConst.calendarScale);
    }

    //PLUMA
    this.pen = new Pen(this, sceneConst.penPosX, sceneConst.penPosY, "pen");

    //EVENTS  para gestionar los personajes
    this.events = new Events(this, sceneConst.eventsPosX, sceneConst.eventsPosY, "character", "box", "book", "book2", "document", this.dataM.bookInfo, this.dataM.noticiaInfo,
      this.dataM.order, this.gameManager, this.dataM.day, this.dataM.month, this.dataM.year);

    //DESKBELL
    this.bellSound = this.sound.add("deskbellSound");
    this.bell = new DeskBell(this, sceneConst.bellPosX, sceneConst.bellPosY, "deskBellSP", "deskBellPressed", this.events, this.bellSound); //Inicializa timbre

    //SEGURIDAD
    if (this.dataM.bodyguard)
      this.bodyguard = new Bodyguard(this, sceneConst.guardPosX, sceneConst.guardPosY, "bodyguardSprite", this.events) //Inicializa bodyguard

    //BOSS
    this.dialogoJefe = this.cache.text.get("jefe");
    this.dialogoJefe = this.dialogoJefe.split("\n");
    this.boss = new Boss(this, sceneConst.bossPosX, sceneConst.bossPosY, "bossSprite", this.dialogoJefe, "box", this.dataM.day, 4, this.dataM.bookInfo, this.dataM.noticiaInfo);

    //ALARMA
    if (this.dataM.alarm)
      this.alarm = new Alarm(this, sceneConst.alarmPosX, sceneConst.alarmPosY, "alarmOff", this.bodyguard, this.events); //Inicializa alarma.

    if (this.dataM.radio) {
      this.radio = new Radio(this, sceneConst.radioPosX, sceneConst.radioPosY, "radio", this.events, this.dataM.bookInfo, this.dataM.noticiaInfo);
      this.radioClock = new Clock(this, 0, 0, "clock", "manecilla");
      this.radioClock.visible = false;
      this.radioActivationTime = this.getRndInteger(sceneConst.offSetBtwRadio, sceneConst.timeSceneEnds / 2);

    }

    //Adición y control de sonidos
    this.music = this.sound.add("music"); //Música manejable
    this.music.play();
    this.isPlaying = true;

    this.signed = this.sound.add("sign");

    this.inkSound = this.sound.add("ink");

    this.ink1 = this.sound.add("ink1");
    this.ink2 = this.sound.add("ink2");
    this.ink3 = this.sound.add("ink3");
    this.ink4 = this.sound.add("ink4");
    this.ink5 = this.sound.add("ink5");

    this.sonidoRadio = this.sound.add("sonidoRadio");

    this.incorrectSound = this.sound.add("incorrectSound");

    this.inkPlayed = false;

    this.boss.enterChar(); //Entrada del Boss

    //Input por teclado
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyReset = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  }

  //Activa el efecto de la radio
  activateRadio() {
    this.radio.setActive(this.events.getBookMalRadio(), this.events.getNoticiaMalRadio());
  }

  //Cuando acaba el tiempo del clock se gestiona si se gana o se pierde
  handleTimeFinished() {
    this.music.stop();
    this.scene.sleep();
    if (this.gameManager.isCleared())
      this.scene.run('victoryScene', { gameManager: this.gameManager, levelManager: this.levelManager })
    else
      this.scene.run('gameOverScene', { gameManager: this.gameManager, levelManager: this.levelManager });
  }

  update(time, delta) {
    if (!this.gameManager.isGameOver()) { // Comprueba si no se han recibido los strikes minimos
      if (this.keyEsc.isDown) { //Menú de pausa
        this.keyEsc.reset();
        this.scene.pause();
        this.scene.add('pause', PauseMenu, false, {
          music: this.music,
          isPlaying: this.isPlaying,
          key: this.sceneKey,
          level: this.dataM.day,
          levelManager: this.levelManager
        })
        this.scene.run('pause');
      }

      if (this.keyReset.isDown) { //Avanza nivel
        this.keyReset.reset();
        this.levelManager.nextLevel();
        this.music.stop();
        this.scene.stop();
      }

      this.events.update(); // No preUpdate porque no existe si hereda de GameObject

      if (this.physics.overlap(this.pen, this.tinteroRojo) && !this.pen.isRed()) { //Overlap Rojo
        this.chooseInkSound();
        this.pen.setRed();
      }

      if (this.physics.overlap(this.pen, this.tinteroVerde) && !this.pen.isGreen()) { //Overlap Verde
        this.chooseInkSound();
        this.pen.setGreen();
      }

      this.pen.on("pointerup", pointer => {
        if (this.pen.isRed() &&
          !this.pen.hasSigned &&
          this.physics.overlap(this.pen, this.events.chara.document)) { //Overlap Documento Pluma Roja
          this.signed.play();

          if (this.events.chara.randoms || this.getRndInteger(1, 100) < 15) { // 85% de que no se vaya si es un personaje especial
            this.events.denyChar();
          }
          else {
            // Dialogo que indica que no quiere irse
            this.events.refuseDenial();
          }
          this.pen.setNormal();
        }
        else if (this.pen.isGreen() && //Overlap Documento Pluma Verde
          !this.pen.hasSigned &&
          this.physics.overlap(this.pen, this.events.chara.document)) {

          this.signed.play();
          this.events.acceptChar();
          this.pen.setNormal();
        }
      })

    }
    else {
      this.music.stop();
      this.scene.sleep();
      this.scene.run('gameOverScene', { gameManager: this.gameManager, levelManager: this.levelManager });
    }
  }

  //Selección entre sonidos de tinta
  chooseInkSound() {
    this.value = this.getRndInteger(0, 4);
    switch (this.value) {
      case 0:
        this.ink1.play();
        break;
      case 1:
        this.ink2.play();
        break;
      case 2:
        this.ink3.play();
        break;
      case 3:
        this.ink4.play();
        break;
      case 4:
        this.ink5.play();
        break;
    }
    this.inkPlayed = true;
  }

  //Comienzan los timers del nivel al irse el jefe de la escena
  bossFinished() {
    if (this.dataM.clock) {
      this.clock.start(this.handleTimeFinished.bind(this), sceneConst.timeSceneEnds);
    }
    if (this.dataM.radio) {
      this.radioClock.start(this.activateRadio.bind(this), this.radioActivationTime);
      this.sonidoRadio.play();
    }
    this.bell.startWork();
  }

  getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Sacudida de pantalla
  strikeShake() {
    this.cameras.main.flash(500, 155, 0, 0, false);
    this.cameras.main.shake(500, 0.001);
    this.incorrectSound.play();
  }

}