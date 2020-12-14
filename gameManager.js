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

    /**
     * Determina si un nivel ha sido finalizado con éxito
     * Para ello se comprueba si el jugador ha llegado al dinero pedido
     * Devuelve true si el jugador ha cumplido el objetivo, false si ha fallado
     * @param {*} amountToClear Cantidad necesaria para completar el nivel actual con éxito
     */
    isCleared(amountToClear){
        return this.dinero > amountToClear;
    }

    /**
     * Comprueba si el jugador ha llegado al límite de strikes
     * Devuelve true si el jugador ha perdido, false en caso de que aún pueda seguir jugando
     */
    isGameOver(){
        return this.strikes >= 3;
    }
}