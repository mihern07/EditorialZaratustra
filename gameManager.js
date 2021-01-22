export default class GameManager {
    constructor() {
        this.dinero = 0;
        this.strikes = 0;
        this.objetivo = 0; // Se gestiona con los métodos de la clase para que varíe entre niveles
        this.numMaxStrikes = 0; // Se gestiona con los métodos de la clase para que varíe entre niveles
        this.bookStrikeCont = 0;
    }

    /**
     * Añade o resta dinero
     * @param {*} quantity Cantidad a sumar (positiva) o negativa (restar)
     */
    addSubstractMoney(quantity) {
        this.dinero += quantity;
    }

    /**
     * Decide si el jugador recibe un strike dependiendo de una probabilidad
     * @param {*} probability Probabilidad de recibir un strike del 0 al 100
     */
    strike(probability) {
        //Generamos un número aleatorio entre 1 y 100
        this.numeroAleatorio = this.getRndInteger(1, 100);
        //Si dicho número es menor o igual a la probabilidad...
        if (this.numeroAleatorio <= probability) {
            //Se le suma un strike
            this.strikes++;
            return true;
        }
        else {
            return false;
        }
    }

    //Comprueba si suficientes libros han sido fallados para recibir strike
    bookStrike() {
        //Si el contador de bookStrike es menor que 2...
        if (this.bookStrikeCont < 2) {
            //Sumamos 1 bookStrike
            this.bookStrikeCont++;
        }
        else {
            //Si no, ponemos el bookStrike a 0 y sumamos un strike
            this.bookStrikeCont = 0;
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
    isCleared() {
        return this.dinero >= this.objetivo;
    }

    /**
     * Comprueba si el jugador ha llegado al límite de strikes
     * Devuelve true si el jugador ha perdido, false en caso de que aún pueda seguir jugando
     * @param {*} amountToClear Cantidad necesaria para completar el nivel actual con éxito
     */
    isGameOver() {
        return this.strikes >= this.numMaxStrikes;
    }

    //Inicializamos las variables
    setGameOver(amountToClear, maxStrikes) {
        this.objetivo = amountToClear;
        this.numMaxStrikes = maxStrikes;
    }


}