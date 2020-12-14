export default class GameManager{
    constructor(){
        this.dinero = 0;
        this.strikes = 0;
    }

    /**
     * Añade o resta dinero
     * @param {*} quantity Cantidad a sumar (positiva) o negativa (restar)
     */
    AddSubstractMoney(quantity){
        this.dinero += quantity;
    }

    /**
     * Decide si el jugador recibe un strike dependiendo de una probabilidad
     * @param {*} probability Probabilidad de recibir un strike del 0 al 100
     */
    Strike(probability){
        this.numeroAleatorio = this.getRndInteger(1,100);
        if (this.numeroAleatorio <= probability){
            this.strikes++;
        }
    }

    /**
     * Método auxiliar que devuelve un número aleatorio entre un mínimo y un máximo
     * @param {*} min 
     * @param {*} max 
     */
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}