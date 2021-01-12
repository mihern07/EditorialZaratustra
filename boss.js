import Dialogue from "./dialogue.js";
import RuleDoc from "./ruledoc.js";
import { bossConst } from "./constants.js";

export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, dialogue, dialogueSprite, level, contDialogue, bookInfo, noticiaInfo) {

        super(scene, x, y, sprite);
        this.scene = scene;
        this.firstPosX = this.x; //Creamos la variable firstPosX (guardar la posicion inicial)
        this.setScale(bossConst.scale);
        this.scene.add.existing(this);
        this.setDepth(bossConst.depth);

        this.bookInfo = bookInfo;
        this.noticiaInfo = noticiaInfo;

        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        this.texto = dialogue;
        this.dialogueSprite = dialogueSprite;
        this.dialogue = new Dialogue(scene, bossConst.dialoguePosX, bossConst.dialoguePosY, this.dialogueSprite, this.texto.slice(level, level + 3));
        this.dialogue.setVisible(false);
        this.dialogue.setInteractive();

        this.SPEED = bossConst.speed;

        //REGLAS
        this.rules = new RuleDoc(this.scene, bossConst.rulesPosX, bossConst.rulesPosY, "rules", "openedRules", this.bookInfo.numPagsBien, this.noticiaInfo.noticiaMal);

        //INI: estado inicial
        //SHOW: en el mostrador con el libro
        //GOING: desde el spawn al mostrador
        //ANSWER: al volver, izq. o dcha.
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        this.contDialogue = contDialogue;

        this.dialogue.on('pointerdown', () => {
            if (this.currentS === this.States.WAIT) {
                if (this.contDialogue > 0) {
                    this.nextDialogue();
                }
                else {
                    this.GoBack();
                }
            }
        });
    }

    EnterChar() { // El personaje entre (izq)
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    GoBack() {
        this.dialogue.setVisible(false);
        this.currentS = this.States.ANSWER;
        this.body.setVelocityX(-this.SPEED);
        this.scene.bossFinished();
    }

    nextDialogue() {
        this.contDialogue--;
        switch (this.contDialogue) {
            case 0:
                this.dialogueTam();
                break;
            case 1:
                this.dialogueNovela();
                break;
            case 2:
                this.dialogueTeatro();
                break;
            case 3:
                this.dialoguePoesia();
                break;
        }
    }

    dialogueNovela() {
        let info = "Jefe\nHoy se permiten en novela: ";
        let novelLength = this.bookInfo.novelaBien.length;
        if (novelLength == 10) {
            info += "todas las categorías";
        }
        else {
            for (let i = 0; i < novelLength; ++i) {
                info += this.bookInfo.novelaBien[i];
                //Arreglos visuales del texto
                if (i + 1 == novelLength)
                    info += ".";
                else if (i + 2 == novelLength)
                    info += " y ";
                else
                    info += ", ";

                if (i == 2) info += "\n";
            }
        }
        if (novelLength != 0)
            this.dialogue.setText(info);
        else
            this.dialogue.setText("Hoy no se permiten novelas");
    }

    dialogueTeatro() {
        let info = "Jefe\nHoy se permite en teatro: ";
        let teatroLength = this.bookInfo.teatroBien.length;
        if (teatroLength == 10) {
            info += "todas las categorías";
        }
        else {
            for (let i = 0; i < teatroLength; ++i) {
                info += this.bookInfo.teatroBien[i];
                //Arreglos visuales del texto
                if (i + 1 == teatroLength)
                    info += ".";
                else if (i + 2 == teatroLength)
                    info += " y ";
                else
                    info += ", ";

                if (i == 2) info += "\n";
            }
        }
        if (teatroLength != 0)
            this.dialogue.setText(info);
        else
            this.dialogue.setText("Hoy no se permiten obras de teatro");
    }

    dialoguePoesia() {
        let info = "Jefe\nHoy se permite en poesía: ";
        let poesiaLength = this.bookInfo.poesiaBien.length;
        if (poesiaLength == 10) {
            info += "todas las categorías";
        }
        else {
            for (let i = 0; i < poesiaLength; ++i) {
                info += this.bookInfo.poesiaBien[i];
                //Arreglos visuales del texto
                if (i + 1 == poesiaLength)
                    info += ".";
                else if (i + 2 == poesiaLength)
                    info += " y ";
                else
                    info += ", ";

                if (i == 2) info += "\n";
            }
        }
        if (poesiaLength != 0)
            this.dialogue.setText(info);
        else
            this.dialogue.setText("Hoy no se permiten poemas");
    }

    dialogueTam() {
        let info = "Jefe\nY respecto al tamaño, ";
        let numPagsLength = this.bookInfo.numPagsBien.length;
        if (numPagsLength == 3) info += "aceptamos todas por igual.";
        else {
            info += "sólo aceptamos obras de entre:\n"
            for (let i = 0; i < numPagsLength; ++i) {
                switch (this.bookInfo.numPagsBien[i]) {
                    case 0:
                        info += "25 y 150 páginas"
                        break;
                    case 1:
                        info += "400 y 700 páginas"
                        break;
                    case 2:
                        info += "1200 y 3000 páginas"
                        break;
                }

                if (i + 1 == numPagsLength) info += ".";
                else info += ", y entre ";
            }
        }
        if (numPagsLength != 0)
            this.dialogue.setText(info);
        else
            this.dialogue.setText("Hoy no se permiten obras de ningún tamaño (por algún motivo)");
    }

    StopChar() { // El personaje pare
        this.body.setVelocityX(0);
        this.currentS = this.States.WAIT;
    }

    preUpdate() {

        if (this.currentS === this.States.GOING && this.x > bossConst.midPos) { //Cuando llegue al medio, se detiene el personaje
            this.StopChar();
            //DIALOGO
            this.dialogue.setVisible(true);
        }

        else if (this.currentS === this.States.ANSWER && this.x < this.firstPosX) { //Cuando salga del campo de vision, por la izquierda, desaparece
            this.visible = false;
            this.scene.bossAnswered = true;
        }
        else if (this.currentS === this.States.ANSWER && this.x > bossConst.midPos) {
            this.rules.visible = true;
        }
    }
}