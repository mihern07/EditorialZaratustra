import Dialogue from "./dialogue.js";
import Clock from "./clock_class.js";
import { radioConst } from "./constants.js";

export default class Radio extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, events, bookInfo, noticiaInfo) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.events = events;
    this.bookInfo = bookInfo;
    this.noticiaInfo = noticiaInfo;
    this.setScale(radioConst.scale);
    
    scene.add.existing(this);

    //Botón inactivo
    this.notActiveButton = scene.add.sprite(x + radioConst.buttonOffsetX, y + radioConst.buttonOffsetY, "radioNotActiveButton");
    this.notActiveButton.setScale(radioConst.buttonScale);

    //B
    this.activeButton = scene.add.sprite(x + radioConst.buttonOffsetX, y + radioConst.buttonOffsetY, "radioActiveButton").setInteractive();
    this.activeButton.setScale(radioConst.buttonScale);
    this.activeButton.visible = false;
  }

  //"Censura" una noticia y una categoría al azar en el momento
  setActive(bookMalRadio, noticiaMalRadio) {
    this.bookMalRadio = bookMalRadio;
    this.noticiaMalRadio = noticiaMalRadio;
    
    this.notActiveButton.visible = false;
    this.activeButton.visible = true;

    //Mostrar diálogo y cambiar orden de las categorías
    //Añadir un libro mal
    switch (this.getRndInteger(0, 2)) {
      case 0:
        //Novela
        this.bookACensurar = this.bookInfo.novelaBien[this.getRndInteger(0, this.bookInfo.novelaBien.length - 1)];
        while (this.censuradoYa(this.bookACensurar)) {
          this.bookACensurar = this.bookInfo.novelaBien[this.getRndInteger(0, this.bookInfo.novelaBien.length - 1)];
        }
      break;
      case 1:
        //Poesía
        this.bookACensurar = this.bookInfo.poesiaBien[this.getRndInteger(0, this.bookInfo.poesiaBien.length - 1)];
        while (this.censuradoYa(this.bookACensurar)) {
          this.bookACensurar = this.bookInfo.poesiaBien[this.getRndInteger(0, this.bookInfo.poesiaBien.length - 1)];
        }
      break;
      case 2:
        //Teatro
        this.bookACensurar = this.bookInfo.teatroBien[this.getRndInteger(0, this.bookInfo.teatroBien.length - 1)];
        while (this.censuradoYa(this.bookACensurar)) {
          this.bookACensurar = this.bookInfo.teatroBien[this.getRndInteger(0, this.bookInfo.teatroBien.length - 1)];
        }
      break;
    }

    //Cancelación del libro
    this.events.addCensoredBook(this.bookACensurar);
    console.log(this.bookACensurar + " censurado");

    //Añadir una noticia mal
    this.noticiaACensurar = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
    while (this.censuradoYa(this.noticiaACensurar)) {
      this.noticiaACensurar = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length - 1)];
    }
    
    //Cancelación de la noticia
    this.events.addCensoredNoticia(this.noticiaACensurar);
    
    console.log(this.noticiaACensurar + " censurado");

    this.text = "Radio\nLamentamos comunicar que a partir de ahora se\nsancionará la publicación de " + this.bookACensurar + " y " + this.noticiaACensurar;

    this.dialogue = new Dialogue(this.scene, radioConst.dialogueX, radioConst.dialogueY, "radioBox", this.text);
    this.clock = new Clock(this.scene, 0, 0, "clock", "manecilla");
    this.clock.visible = false;
    this.clock.start(this.setNotActive.bind(this), radioConst.dialogueTime);
  }

  //Apaga la radio y anula los textos
  setNotActive() {
    this.notActiveButton.visible = true;
    this.activeButton.visible = false;
    this.dialogue.destroyText();
    this.dialogue.destroy();
  }

  censuradoYa(censuraAComprobar) {
    this.estaCensurado = false;
    let i = 0;
    while (i < this.bookMalRadio.length && censuraAComprobar != this.bookMalRadio[i]) {
      i++;
    }
    if (i == this.bookMalRadio.length) {
      return false;
    } else {
      return true;
    }
  }

  //Devuelve un num aleatorio entre min y max (incluidos)
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}