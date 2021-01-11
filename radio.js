import Dialogue from "./dialogue.js";
import Clock from "./clock_class.js";

export default class Radio extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, events, bookInfo, noticiaInfo) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.events = events;
    this.bookInfo = bookInfo;
    this.noticiaInfo = noticiaInfo;
    this.setScale(.8);
    scene.add.existing(this);


    this.notActiveButton = scene.add.sprite(x + 65, y + 40, "radioNotActiveButton");
    this.notActiveButton.setScale(.08);

    this.activeButton = scene.add.sprite(x + 65, y + 40, "radioActiveButton").setInteractive();
    this.activeButton.setScale(.08);
    this.activeButton.visible = false;
  }
  setActive(bookMalRadio, noticiaMalRadio){
    this.bookMalRadio = bookMalRadio;
    this.noticiaMalRadio = noticiaMalRadio;
    this.notActiveButton.visible = false;
    this.activeButton.visible = true;

    //Mostrar diálogo y cambiar orden de las categorías
    //Añadir un libro mal
    switch(this.getRndInteger(0,2)){
      case 0:
        this.bookACensurar = this.bookInfo.novelaBien[this.getRndInteger(0, this.bookInfo.novelaBien.length-1)];
        while(this.censuradoYa(this.bookACensurar)){
          this.bookACensurar = this.bookInfo.novelaBien[this.getRndInteger(0, this.bookInfo.novelaBien.length-1)];
        }
      break;
      case 1:
        this.bookACensurar = this.bookInfo.poesiaBien[this.getRndInteger(0, this.bookInfo.poesiaBien.length-1)];
        while(this.censuradoYa(this.bookACensurar)){
          this.bookACensurar = this.bookInfo.poesiaBien[this.getRndInteger(0, this.bookInfo.poesiaBien.length-1)];
        }
      break;
      case 2:
        this.bookACensurar = this.bookInfo.teatroBien[this.getRndInteger(0, this.bookInfo.teatroBien.length-1)];
        while(this.censuradoYa(this.bookACensurar)){
          this.bookACensurar = this.bookInfo.teatroBien[this.getRndInteger(0, this.bookInfo.teatroBien.length-1)];
        }
      break;
    }
    this.events.addCensoredBook(this.bookACensurar);
    console.log(this.bookACensurar + " censurado");

    //Añadir una noticia mal
    this.noticiaACensurar = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length-1)];
    while(this.censuradoYa(this.noticiaACensurar)){
      this.noticiaACensurar = this.noticiaInfo.noticiaBien[this.getRndInteger(0, this.noticiaInfo.noticiaBien.length-1)];
    }
    this.events.addCensoredNoticia(this.noticiaACensurar);
    console.log(this.noticiaACensurar + " censurado");
    
    this.text = "Radio\nLamentamos comunicar que a partir de ahora se\nsancionará la publicación de " + this.bookACensurar + " y " + this.noticiaACensurar;

    this.dialogue = new Dialogue(this.scene, 300, 100, "box", this.text);
    this.clock = new Clock(this.scene, 0, 0, "clock", "manecilla");
    this.clock.visible = false;
    this.clock.start(this.setNotActive.bind(this), 10000);
  }

  setNotActive(){
    this.notActiveButton.visible = true;
    this.activeButton.visible = false;
    this.dialogue.destroyText();
    this.dialogue.destroy();
  }

  censuradoYa(censuraAComprobar){
    this.estaCensurado = false;
    let i = 0;
    while (i < this.bookMalRadio.length && censuraAComprobar != this.bookMalRadio[i]){
      i++;
    }
    if (i == this.bookMalRadio.length){
      return false;
    }else{
      return true;
    }
  }

  getRndInteger(min, max) { // devuelve un num aleatorio entre min y max (incluidos)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}