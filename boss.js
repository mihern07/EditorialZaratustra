import Dialogue from "./dialogue.js";
import RuleDoc from "./ruledoc.js";
import { bossConst } from "./constants.js";

export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, dialogue, dialogueSprite, level, contDialogue, bookInfo, noticiaInfo) {

        super(scene, x, y, sprite);
        this.scene = scene;

        //Posición inicial del jefe
        this.firstPosX = this.x;

        this.setScale(bossConst.scale);
        this.scene.add.existing(this);
        this.setDepth(bossConst.depth);

        //Nivel actual
        this.level = level - 1;

        //Arrays con la información de las categorías
        this.bookInfo = bookInfo;
        this.noticiaInfo = noticiaInfo;

        //Movimiento del guardia
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(0);

        //Animación de movimiento
        this.xnow = 0;
        this.defaultY = y;

        //Gestión del diálogo
        this.texto = dialogue;
        this.dialogueSprite = dialogueSprite;
        this.dialogue = new Dialogue(scene, bossConst.dialoguePosX, bossConst.dialoguePosY, this.dialogueSprite, this.texto.slice(this.level * 3, this.level * 3 + 3));
        this.dialogue.setVisible(false);
        this.dialogue.setInteractive();


        //Asignamos el diálogo extra del jefe si hay
        //Utilizado para ir pasando el texto extra
        this.dialogueExtraCount = 0;
        switch (this.level) {
            case 0:
                //Explicación de los colores
                this.extraText = this.scene.cache.text.get("jefeColores");
                this.extraText = this.extraText.split("\n");
                this.contExtraDialogue = 7;
                break;
            case 3:
                //Explicación de las noticias
                this.extraText = this.scene.cache.text.get("jefeNoticia");
                this.extraText = this.extraText.split("\n");
                this.contExtraDialogue = 3;
                break;
            case 4:
                //Explicación del guardia
                this.extraText = this.scene.cache.text.get("jefeGuardia");
                this.extraText = this.extraText.split("\n");
                this.contExtraDialogue = 4;
                break;
            case 5:
                //Explicación de la radio
                this.extraText = this.scene.cache.text.get("jefeRadio");
                this.extraText = this.extraText.split("\n");
                this.contExtraDialogue = 6;
                break;
            default:
                //No hay diálogo extra
                this.contExtraDialogue = 0;
                break;
        }

        //Asigna la velocidad del jefe
        this.SPEED = bossConst.speed;

        //Reglas
        this.rules = new RuleDoc(this.scene, bossConst.rulesPosX, bossConst.rulesPosY, "rules", "openedRules", this.bookInfo.numPagsBien, this.noticiaInfo.noticiaMal);

        //Estados del jefe
        this.States = { INI: 0, GOING: 1, SHOW: 2, ANSWER: 3, WAIT: 4 };
        this.currentS = this.States.INI;

        //Utilizada para pasar el diálogo
        this.contDialogue = contDialogue;

        //Al pulsar en el diálogo
        this.dialogue.on('pointerdown', () => {
            if (this.currentS === this.States.WAIT) {
                //Pasamos de diálogo normal y si no nos hemos quedado aún sin él
                if (this.contDialogue > 0) {
                    this.nextDialogue();
                }
                //Si ya hemos dicho todo el diálogo usual
                else {
                    //Si tenemos diálogo extra lo decimos hasta que se acabe
                    if (this.contExtraDialogue > 0) {
                        this.extraInfo();
                    } else {
                        this.goBack();
                    }
                }
            }
        });
    }

    //Entra el jefe
    enterChar() {
        if (this.currentS === this.States.INI) {
            this.body.setVelocityX(this.SPEED);
            this.currentS = this.States.GOING;
        }
    }

    //El jefe se va
    goBack() {
        this.dialogue.setVisible(false);
        this.currentS = this.States.ANSWER;
        this.body.setVelocityX(-this.SPEED);
        this.scene.bossFinished();
    }

    //Determina el siguiente diálogo normal
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

    //Determina el siguiente diálogo extra
    extraInfo() {
        this.dialogue.setText(this.extraText.slice(this.dialogueExtraCount, this.dialogueExtraCount + 3));
        this.dialogueExtraCount += 3;
        this.contExtraDialogue--;
    }

    //Muestra la información de novela
    dialogueNovela() {
        let info = "Jefe Fernando\nHoy se permiten en novela: ";
        let novelLength = this.bookInfo.novelaBien.length;
        
        //Si se admite todo
        if (novelLength == 10) {
            info += "todas las categorías";
        }
        //Si no se admite todo...
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
        //Si se permite alguna novela
        if (novelLength != 0)
            this.dialogue.setText(info);
        //Si no se permite ninguna
        else
            this.dialogue.setText("Jefe Fernando\nHoy no se permiten novelas");
    }

    //Muestra la información de teatro
    dialogueTeatro() {
        let info = "Jefe Fernando\nHoy se permite en teatro: ";
        let teatroLength = this.bookInfo.teatroBien.length;

        //Si se admite todo
        if (teatroLength == 10) {
            info += "todas las categorías";
        }
        //Si no se admite todo...
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
        //Si se permite algo de teatro
        if (teatroLength != 0)
            this.dialogue.setText(info);
        //Si no se permite nada de teatro
        else
            this.dialogue.setText("Jefe Fernando\nHoy no se permiten obras de teatro");
    }

    //Muestra la información de poesía
    dialoguePoesia() {
        let info = "Jefe Fernando\nHoy se permite en poesía: ";
        let poesiaLength = this.bookInfo.poesiaBien.length;

        //Si se admite todo
        if (poesiaLength == 10) {
            info += "todas las categorías";
        }
        //Si no se admite todo...
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
        //Si se permite algo de poesía
        if (poesiaLength != 0)
            this.dialogue.setText(info);
        // Si no se permite nada de poesía
        else
            this.dialogue.setText("Jefe Fernando\nHoy no se permiten poemas");
    }

    //Muestra la información del tamaño de las páginas
    dialogueTam() {
        let info = "Jefe Fernando\nY respecto al tamaño, ";
        let numPagsLength = this.bookInfo.numPagsBien.length;
        
        if (numPagsLength == 3) info += "aceptamos todas por igual.";

        else {
            info += "sólo aceptamos obras de entre:\n"
            for (let i = 0; i < numPagsLength; ++i) {

                //Solo hay tres franjas posibles de páginas
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
        //Caso extraño en el que no se permita nada
        else
            this.dialogue.setText("Jefe Fernando\nHoy no se permiten obras de ningún tamaño (por algún motivo)");
    }

    //Para al jefe
    stopChar() {
        this.body.setVelocityX(0);
        this.currentS = this.States.WAIT;
    }

    preUpdate() {

        //Cuando llegue al medio, se detiene al jefe
        if (this.currentS === this.States.GOING && this.x > bossConst.midPos) {
            this.stopChar();
            //Muestra su diálogo
            this.dialogue.setVisible(true);
        }

        //Cuando sale del campo de vision (por la izquierda) desaparece
        else if (this.currentS === this.States.ANSWER && this.x < this.firstPosX) {
            this.visible = false;
            this.scene.bossAnswered = true;
        }

        //Cuando se va deja las reglas
        else if (this.currentS === this.States.ANSWER && this.x > bossConst.midPos) {
            this.rules.visible = true;
        }

        //Animación de movimiento
        else if (this.currentS === this.States.GOING || this.currentS === this.States.ANSWER) {
            this.y = this.defaultY + Math.sin(2 * Math.PI * (this.xnow / 50)) * 5;
            this.xnow++;
        }
    }
}