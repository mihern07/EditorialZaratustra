import levelTemplate from "./levelTemplate.js";
import { levelsConst } from "./constants.js";

class levelManager extends Phaser.Scene {

	constructor() {
        super({key:'levelManager'});
	}

	create() {
        this.input.mouse.disableContextMenu(); //No permite click derecho en el juego.

        this.actualLevel = 1;

        this.scene.remove("storyIntro");

        //Primer nivel sólo si no existe
        if(this.scene.get(levelsConst.keyLevel + this.actualLevel) === null){
            this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[0]);
            this.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
        }
        else
            this.resumeLevel();
        
	}

    nextLevel(){
        if(this.actualLevel < levelsConst.totalLevels){
            //Borramos el actual
            this.scene.remove(levelsConst.keyLevel + this.actualLevel);
            delete this.level;
            //Sumamos nivel
            this.actualLevel++;
            //Creamos el nivel
            this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[this.actualLevel-1]);
            //Se añade al array y se pone en marcha
            this.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
        }
    }

    resumeLevel(){
        //Continuamos con el nivel actual
        this.scene.switch(levelsConst.keyLevel + this.actualLevel);
    }
	
}

export default levelManager;