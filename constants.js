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
    eventsPosY: 380,
    bellPosX: 825,
    bellPosY: 500,
    guardPosX: 955,
    guardPosY: 340,
    bossPosX: 0,
    bossPosY: 340,
    alarmPosX: 200,
    alarmPosY: 775,

    boardNumPostIts: 13,

    everyCategory: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],

    firstLevelWinCondition: 1500,
    firstLevelLooseCondition: 2,
    firstLevelNovelG: ["Aventura", "Histórico", "Drama", "Académico", "Ficción"],
    firstLevelNovelB: ["Romance", "Suspense", "Policíaco", "Fantasía", "Comedia"],
    firstLevelPoetryG: ["Romance", "Aventura", "Suspense", "Histórico", "Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
    firstLevelPoetryB: [],
    firstLevelTheatreG: ["Romance", "Aventura", "Histórico", "Suspense"],
    firstLevelTheatreB: ["Policíaco", "Drama", "Fantasía", "Académico", "Comedia", "Ficción"],
    firstLevelNoticiaG: ["Deportes", "Meteorología", "Ensayo", "Esquela", "Crónica", "Propaganda"],
    firstLevelNoticiaB: ["Opinión"],
    firstLevelCorrects: 7,
    firstLevelMinCor: 17,
    firstLevelSpecialChara: [],
    firstDay: 1,

    timeSceneEnds: 180000,
    offSetBtwRadio: 5000,
    radioPosX: 250,
    radioPosY: 520,

    month: 4,
    year: 1920,

    thinBook: 0,
    normalBook: 1,
    thickBook: 2,

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
    rulesPosX: 500,
    rulesPosY: 550,

    midPos: 540,

    scale: .5,
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
    textScale: 1.25,
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

    midPos: 540,
    outPos: 120,

    thinPags: [25, 150],
    normalPags: [400, 700],
    thickPags: [1200, 3000],

    scale: .5,
    depth: -1,

    speed: 190
}
export const guardConst = {
    midPos: 580,

    scale: .5,
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
    offsetX: -85,
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
    backgroundScale: 0.5,
    textPosX: 200,
    textPosY: 350
}