import levelTemplate from "./levelTemplate.js";
import { levelsConst } from "./constants.js";

class LevelManager {

    constructor(scene) {
        this.actualLevel = 1;
        this.scene = scene;
        this.started = false;
    }

    //Primer nivel después de la intro
    firstLevel() {
        this.scene.scene.remove("storyIntro");

        if (this.scene.scene.get("level1") == null) {
            this.started = true;
            this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[0]);
            this.scene.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
        }
    }

    //Avanza al siguiente nivel
    nextLevel() {
        if (this.actualLevel < levelsConst.totalLevels) {
            //Borramos el actual
            this.scene.scene.remove(levelsConst.keyLevel + this.actualLevel);
            delete this.level;
            //Sumamos nivel
            this.actualLevel++;
            //Creamos el nivel
            this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[this.actualLevel - 1]);
            //Se añade al array y se pone en marcha
            this.scene.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
        }
        else {
            this.scene.scene.remove(levelsConst.keyLevel + this.actualLevel);
            delete this.level;

            this.scene.scene.run('endScene');
        }
    }

    //Continuamos con el nivel actual
    resumeLevel() {
        this.scene.scene.run(levelsConst.keyLevel + this.actualLevel);
    }

    //Reinicia el juego desde el principio
    restart() {
        if (this.scene.scene.get("level1") == null) {
            this.scene.scene.remove(levelsConst.keyLevel + this.actualLevel);
            this.actualLevel = 1;
            this.started = true;
            this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[0]);
            this.scene.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
        }
    }

    //Reinicia el nivel
    restartActualLevel() {
        this.scene.scene.remove(levelsConst.keyLevel + this.actualLevel);
        this.level = new levelTemplate(levelsConst.keyLevel + this.actualLevel, this, levelsConst.dataLevel[this.actualLevel - 1]);
        this.scene.scene.add(levelsConst.keyLevel + this.actualLevel, this.level, true);
    }

}

export default LevelManager;