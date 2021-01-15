export const levelsConst = {

    totalLevels: 2,

    keyLevel: 'level',

    dataLevel: [
        //NIVEL 1
        {
            clock: true, board: false, calendar: true, bodyguard: false, alarm: false, radio: false, winCondition: 1000, loseCondition: 2, month: 4, year: 1920, day: 1,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: [],
                noticiaMal: []
            },
            bookInfo: {
                novelaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                poesiaBien: [],
                teatroBien: [],
                novelaMal: [],
                poesiaMal: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroMal: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [0, 1, 2], // libro corto y largo
                numPagsMal: [] // libro mediano
            }
        },
        //NIVEL 2
        {
            clock: true, board: true, calendar: true, bodyguard: false, alarm: false, radio: false, WinCondition: 1200, LoseCondition: 2, month: 4, year: 1920, day: 2,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: [],
                noticiaMal: []
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaMal: [],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [2, 0], // libro corto y largo
                numPagsMal: [1] // libro mediano
            }
        },

        //NIVEL 3 // Añadir explicación de noticias
        {
            clock: true, board: true, calendar: true, bodyguard: false, alarm: false, radio: false, WinCondition: 1300, LoseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Deportes", "Meteorología", "Esquela", "Crónica", "Propaganda"],
                noticiaMal: ["Opinión", "Ensayo"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Ficción", "Romance", "Suspense"],
                poesiaBien: [ "Suspense", "Histórico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Policíaco", "Fantasía", "Comedia",  "Drama", "Académico"],
                poesiaMal: ["Drama", "Fantasía","Romance", "Aventura", "Académico"],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Policíaco", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [1], // libro corto y largo
                numPagsMal: [0, 2] // libro mediano
            }
        },

        //NIVEL 4 // Añadir explicacion de bodyguard
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: false, WinCondition: 1500, LoseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [1, 0] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Opinión", "Ensayo", "Esquela", "Crónica", "Propaganda"],
                noticiaMal: ["Deportes", "Meteorología"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Drama", "Académico", "Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaBien: ["Romance", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense", "Ficción"],
                novelaMal: ["Histórico", "Ficción", "Romance",],
                poesiaMal: ["Histórico", "Policíaco", "Drama", "Aventura", "Suspense", "Fantasía", "Académico",],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [1, 0], // libro corto y largo
                numPagsMal: [2] // libro mediano
            }
        },

        //NIVEL 5 // Añadir explicacion de radio + Cambiar un poco las categorías
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, WinCondition: 1500, LoseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [2] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Opinión", "Ensayo", "Deportes", "Propaganda"],
                noticiaMal: ["Esquela", "Crónica", "Meteorología"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaMal: [],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [0], // libro corto y largo
                numPagsMal: [1, 2] // libro mediano
            }
        },

        //NIVEL 6 // Añadir explicacion de radio
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, WinCondition: 1500, LoseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [3, 4] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Meteorología", "Ensayo", "Esquela", "Crónica"],
                noticiaMal: ["Deportes", "Opinión", "Propaganda"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaMal: [],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [1, 2], // libro corto y largo
                numPagsMal: [0] // libro mediano
            }
        },

        //NIVEL 7 // Añadir explicacion de radio
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, WinCondition: 1500, LoseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 7, // Número mínimo de libros correctos 
                minBooks: 17, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [5, 6] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: [ "Deportes", "Meteorología", "Propaganda"],
                noticiaMal: ["Opinión", "Ensayo", "Esquela", "Crónica"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaMal: [],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [0, 2], // libro corto y largo
                numPagsMal: [1] // libro mediano
            }
        },
    ]
}


export const sceneConst = {
    bgPosX: 550,
    bgPosY: 397,
    fgPosX: 550,
    fgPosY: 392,
    clockPosX: 750,
    clockPosY: 55,
    boardPosX: 965,
    boardPosY: 340,
    redInkwellPosX: 925,
    greenInkwellPosX: 180,
    inkwellPosY: 670,
    calendarPosX: 100,
    calendarPosY: 300,
    penPosX: 700,
    penPosY: 700,
    eventsPosX: 955,
    eventsPosY: 410,
    bellPosX: 825,
    bellPosY: 500,
    guardPosX: 965,
    guardPosY: 420,
    bossPosX: 0,
    bossPosY: 340,
    alarmPosX: 200,
    alarmPosY: 775,

    boardNumPostIts: 13,

    timeSceneEnds: 180000,
    offSetBtwRadio: 5000,
    radioPosX: 250,
    radioPosY: 520,

    // thinBook: 0,
    // normalBook: 1,
    // thickBook: 2,

    bgDepth: -2,

    calendarScale: .45
}
export const titleConst = {
    bgPosX: 15,
    bgPosY: 0,
    animPosX: 50,
    animPosY: 390,

    bgScale: 0.57,
    animScale: .6
}
export const victoryConst = {
    bgPosX: 550,
    bgPosY: 400,
    congratPosX: 350,
    congratPosY: 200,
    puntPosX: 325,
    puntPosY: 300,
    strikesPosX: 315,
    strikesPosY: 400,
    buttonPosX: 550,
    buttonPosY: 600,
    buttonTextPosX: 420,
    buttonTextPosY: 585,

    puntTint: 0x71CA1E,
    strikeTint: 0x71CA1E,

    congSize: 50,
    puntSize: 40,
    strikeSize: 40,
    buttonTextSize: 30,

    bgScale: 1.1,
    buttonScale: 2
}
export const gameOverConst = {
    bgPosX: 550,
    bgPosY: 400,
    congratPosX: 200,
    congratPosY: 200,
    puntPosX: 325,
    puntPosY: 300,
    strikesPosX: 315,
    strikesPosY: 400,
    buttonPosX: 550,
    buttonPosY: 600,
    buttonTextPosX: 420,
    buttonTextPosY: 585,

    congratTint: 0xE31B1B,
    puntTint: 0xE31B1B,
    strikeTint: 0xE31B1B,

    congSize: 50,
    puntSize: 40,
    strikeSize: 40,
    buttonTextSize: 30,

    buttonScale: 2
}
export const deskBellConst = {
    scale: .35
}
export const clockConst = {
    clockScale: .5,
    duration: 45000
}
export const bossConst = {
    dialoguePosX: 530,
    dialoguePosY: 415,
    rulesPosX: 650,
    rulesPosY: 550,

    midPos: 540,

    scale: .4,
    depth: -2,

    speed: 190
}
export const newsConst = {
    offsetX: -400,
    firstOffsetY: -375,
    secondOffsetY: -350,

    scale: .1,
    textScale: 1,
    depth: 2,
    openedScale: 1.3,
    openedDepth: 4
}
export const bookConst = {
    offsetX: -205,
    firstOffsetY: -300,
    secondOffsetY: -255,
    thirdOffsetY: -210,

    scale: .075,
    textScale: 25,
    depth: 2,
    openedScale: .48,
    openedDepth: 4
}
export const characterConst = {
    dialoguePosX: 530,
    dialoguePosY: 415,
    bookPosX: 500,
    bookPosY: 550,
    documentPosX: 650,
    documentPosY: 550,

    headY: 260,
    headScale: .36,

    hairY: 240,
    hairScale: .36,

    clothesY: 350,
    clothesScale: .4,

    midPos: 540,
    outPos: 120,

    thinPags: [25, 150],
    normalPags: [400, 700],
    thickPags: [1200, 3000],

    scale: .4,
    depth: -1,

    speed: 190
}
export const guardConst = {
    midPos: 620,

    scale: .4,
    depth: -2,

    speed: 190
}
export const boardConst = {
    categories: ["Nov\nela", "Poe\nsía", "Tea\ntro", "Rom\nance", "Ave\nntura", "Sus\npen\nse", "His\ntór\nico", "Pol\nicía\nco", "Dra\nma", "Fan\ntasía", "Aca\ndém\nico", "Com\nedia", "Fic\nción"],
    catSprites: ["novelaPost", "poesiaPost", "TeatroPost", "romancePost", "aventuraPost", "suspensePost", "historicoPost", "policiacoPost", "dramaPost", "fantasiaPost", "academicoPost", "comediaPost", "ficcionPost"],

    offsetX: -45,
    offsetY: -75,
    postItDiff: 5,

    scale: .15
}
export const alarmConst = {
    scale: .175
}
export const dialogueConst = {
    offsetX: -250,
    offsetY: -35,

    scale: .4
}
export const documentConst = {
    scale: .25,
    depth: 1,
}
export const inkwellConst = {
    scale: .75
}
export const eventsConst = {
    moneyAmount: 200,
    wifeMoneyAmount: 500,
    childMoneyAmount: 250,
    homelessMoneyAmount: 300,
    briberyMoneyAmount: 400,
    deliveryMoneyAmount: 450,
    wifeProbability: 85,
    childProbability: 15,
    homelessProbability: 30,
    briberyProbability: 50,
    deliveryProbability: 60,
}
export const penConst = {
    scale: .25,
    depth: 3,
    tintNormal: 0x000000,
    tintRed: 0xff0000,
    tintGreen: 0x008000
}
export const postItConst = {
    offsetX: -11,
    offsetY: -22,

    scale: .8
}
export const ruleConst = {
    offsetX: -225,
    offsetY: -245,
    offsetYAcum: 25,
    noticiaOffsetY: -115,

    scale: .3,
    depth: 2,
    openedScale: .5,
    openedDepth: 4
}

export const draggableConst = {
    tableX0: 50,
    tableXX: 1040,
    tableY0: 450,
    tableYY: 900,

    boardX0: 890,
    boardXX: 1040,
    boardY0: 85,
    boardYY: 400
}

export const radioConst = {
    buttonOffsetX: 65,
    buttonOffsetY: 40,
    scale: 0.8,
    buttonScale: 0.08,
    dialogueX: 300,
    dialogueY: 100,
    dialogueTime: 10000
}

export const storyIntro = {
    backgroundPosX: 550,
    backgroundPosY: 400,
    backgroundScaleX: 0.8,
    backgroundScaleY: 0.7,
    textScale: 26,
    textPosX: 200,
    textPosY: 350
}

export const pauseConst = {
    volumePos: 10,
    middlePos: 2,
    buttonPos: 3,
    depth: 100,
    volumeScale: .3,
}