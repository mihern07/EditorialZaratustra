export const levelsConst = {

    totalLevels: 7,

    keyLevel: 'level',

    dataLevel: [
        //NIVEL 1
        {
            clock: true, board: false, calendar: true, bodyguard: false, alarm: false, radio: false, winCondition: 1000, loseCondition: 2, month: 4, year: 1920, day: 1,
            order: {
                numCorrects: 5, // Número mínimo de libros correctos 
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
            clock: true, board: true, calendar: true, bodyguard: false, alarm: false, radio: false, winCondition: 1400, loseCondition: 2, month: 4, year: 1920, day: 2,
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
                numPagsBien: [2, 0],
                numPagsMal: [1]
            }
        },

        //NIVEL 3 // Añadir explicación de noticias
        {
            clock: true, board: true, calendar: true, bodyguard: false, alarm: false, radio: false, winCondition: 1600, loseCondition: 2, month: 4, year: 1920, day: 3,
            order: {
                numCorrects: 8, // Número mínimo de libros correctos 
                minBooks: 20, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Deportes", "Meteorología", "Esquela", "Crónica", "Propaganda"],
                noticiaMal: ["Opinión", "Ensayo"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Histórico", "Ficción", "Romance", "Suspense"],
                poesiaBien: ["Suspense", "Histórico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Policíaco", "Fantasía", "Comedia", "Drama", "Académico"],
                poesiaMal: ["Drama", "Fantasía", "Romance", "Aventura", "Académico"],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Policíaco", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [1], 
                numPagsMal: [0, 2] 
            }
        },

        //NIVEL 4 // Añadir explicacion de bodyguard
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: false, winCondition: 1600, loseCondition: 3, month: 4, year: 1920, day: 4,
            order: {
                numCorrects: 8, // Número mínimo de libros correctos 
                minBooks: 23, // Número mínimo de libros entre los que se encuentran los anteriores
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
                numPagsBien: [1, 0], 
                numPagsMal: [2] 
            }
        },

        //NIVEL 5 // Añadir explicacion de radio + Cambiar un poco las categorías
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, winCondition: 1800, loseCondition: 3, month: 4, year: 1920, day: 5,
            order: {
                numCorrects: 9, // Número mínimo de libros correctos 
                minBooks: 24, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [2] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Opinión", "Ensayo", "Deportes", "Propaganda"],
                noticiaMal: ["Esquela", "Crónica", "Meteorología"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Fantasía", "Académico", "Ficción"],
                poesiaBien: ["Aventura", "Histórico", "Policíaco", "Fantasía", "Comedia", "Ficción"],
                teatroBien: ["Fantasía", "Académico", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Suspense", "Policíaco", "Comedia", "Histórico", "Drama"],
                poesiaMal: ["Suspense", "Drama", "Académico", "Romance"],
                teatroMal: ["Romance", "Policíaco", "Drama", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [0], 
                numPagsMal: [1, 2] 
            }
        },

        //NIVEL 6 // Añadir explicacion de radio
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, winCondition: 1800, loseCondition: 3, month: 4, year: 1920, day: 6,
            order: {
                numCorrects: 9, // Número mínimo de libros correctos 
                minBooks: 26, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [3, 4] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Meteorología", "Ensayo", "Esquela", "Crónica"],
                noticiaMal: ["Deportes", "Opinión", "Propaganda"]
            },
            bookInfo: {
                novelaBien: ["Suspense", "Policíaco", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía"],
                teatroBien: ["Romance", "Aventura", "Histórico", "Suspense"],
                novelaMal: ["Romance", "Fantasía", "Comedia", "Aventura", "Histórico"],
                poesiaMal: ["Romance", "Académico", "Comedia", "Ficción"],
                teatroMal: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [1, 2], 
                numPagsMal: [0]
            }
        },

        //NIVEL 7 // Añadir explicacion de radio
        {
            clock: true, board: true, calendar: true, bodyguard: true, alarm: true, radio: true, winCondition: 2000, loseCondition: 3, month: 4, year: 1920, day: 7,
            order: {
                numCorrects: 10, // Número mínimo de libros correctos 
                minBooks: 27, // Número mínimo de libros entre los que se encuentran los anteriores
                specialChara: [5, 6] // perosnajes especiales del nivel
            },
            noticiaInfo: {
                noticiaBien: ["Deportes", "Meteorología", "Propaganda"],
                noticiaMal: ["Opinión", "Ensayo", "Esquela", "Crónica"]
            },
            bookInfo: {
                novelaBien: ["Aventura", "Romance", "Histórico", "Drama", "Académico", "Ficción"],
                poesiaBien: ["Romance", "Aventura", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                teatroBien: ["Romance", "Aventura", "Fantasía", "Académico", "Comedia", "Ficción"],
                novelaMal: ["Suspense", "Policíaco", "Fantasía", "Comedia"],
                poesiaMal: ["Suspense", "Histórico", "Policíaco"],
                teatroMal: ["Histórico", "Suspense", "Policíaco", "Drama"],
                everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
                numPagsBien: [0, 2],
                numPagsMal: [1] 
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
    blackBoxPosX: 550,
    blackBoxPosY: 330,
    congratPosX: 390,
    congratPosY: 200,
    puntPosX: 250,
    puntPosY: 300,
    strikesPosX: 355,
    strikesPosY: 400,
    buttonPosX: 550,
    buttonPosY: 600,
    buttonTextPosX: 460,
    buttonTextPosY: 585,

    puntTint: 0x71CA1E,
    strikeTint: 0x71CA1E,

    congSize: 50,
    puntSize: 40,
    strikeSize: 40,
    buttonTextSize: 30,

    bgScale: 1.1,
    buttonScale: 2,
    blackBoxScaleX: 0.8,
    blackBoxScaleY: 1
}
export const creditsConst = {
    posX: 550,
    pos2X: 300,
    posY: 900,
    pos2Y: 1300,
    pos3Y: 1400,
    pos4Y: 1800,
    pos5Y: 1900,
    pos6Y: 2100,
    pos7Y: 2200,
    pos8Y: 2500,

    puntTint: 0x71CA1E,
    strikeTint: 0x71CA1E,

    textSize: 50,
    size: 40,

    scale: 1.1,
}
export const gameOverConst = {
    bgPosX: 550,
    bgPosY: 400,
    blackBoxPosX: 550,
    blackBoxPosY: 330,
    congratPosX: 275,
    congratPosY: 200,
    puntPosX: 340,
    puntPosY: 300,
    strikesPosX: 370,
    strikesPosY: 400,
    buttonPosX: 550,
    buttonPosY: 600,
    buttonTextPosX: 450,
    buttonTextPosY: 570,

    congratTint: 0xE31B1B,
    puntTint: 0xE31B1B,
    strikeTint: 0xE31B1B,

    congSize: 50,
    puntSize: 40,
    strikeSize: 40,
    buttonTextSize: 50,

    buttonScale: 2,
    blackBoxScaleX: 0.8,
    blackBoxScaleY: 1
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
    rulesPosX: 330,
    rulesPosY: 550,

    midPos: 540,

    scale: .4,
    depth: -2,

    speed: 190
}
export const newsConst = {
    offsetX: -400,
    firstOffsetY: -375,
    secondOffsetY: -300,

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
    categories: ["Rom\nance", "Ave\nntura", "Sus\npen\nse", "His\ntór\nico", "Pol\nicía\nco", "Dra\nma", "Fan\ntasía", "Aca\ndém\nico", "Com\nedia", "Fic\nción", "Nov\nela", "Poe\nsía", "Tea\ntro"],
    catSprites: ["romancePost", "aventuraPost", "suspensePost", "historicoPost", "policiacoPost", "dramaPost", "fantasiaPost", "academicoPost", "comediaPost", "ficcionPost", "novelaPost", "poesiaPost", "TeatroPost"],

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
    offsetY: -40,
    radioOffsetY: -65,

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
    newsProbability: 100,

    eventDialogue: ["ninio", "tendencias", "correos", "mujerDelJefe", "sobornador", "vagabundo", "mujerDelJefeMal", "correosMal"],
    bookDialogue: ["dialogoBase", "dialogoBaseAmigable", "dialogoBaseMalEducado", "dialogoBasePijo", "dialogoBaseResponsable", "dialogoBaseTimido"],
    newsDialogue: ["noticiasBase", "noticiasAmigable", "noticiasMalEducado", "noticiasPijo", "noticiasResponsable", "noticiasTimido"]
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

    limitX: 1040,
    limitY: 400,
    firstLimitY: 85,
    firstLimitX: 890,

    scale: .8
}
export const ruleConst = {
    offsetX: 75,
    offsetY: -245,
    offsetYAcum: 25,
    noticiaOffsetY: -115,

    scale: .3,
    depth: 2,
    openedScale: .5,
    openedDepth: 4
}

export const draggableConst = {
    tableX0: 150,
    tableXX: 900,
    tableY0: 450,
    tableYY: 740,

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

export const endConst = {
    backgroundPosX: 550,
    backgroundPosY: 400,
    backgroundScaleX: 0.8,
    backgroundScaleY: 0.7,
    textScale: 26,
    textPosX: 200,
    textPosY: 350,

    button1PosX: 250,
    button2PosX: 850,
    buttonPosY: 700,

    buttonText1PosX: 150,
    buttonText2PosX: 790,
    buttonTextPosY: 670,

    buttonTextSize: 50,
}

export const pauseConst = {
    volumePos: 10,
    middlePos: 2,
    buttonPos: 3,
    depth: 100,
    volumeScale: .3,
}