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
    alarmPosY: 800,

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
    firstLevelCorrects: 7,
    firstLevelMinCor: 17,

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
    scale: .2
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

    scale: .5,
    depth: -2,

    speed: 190
}
export const bookConst = {
    offsetX: 250,
    firstOffsetY: 400,
    secondOffsetY: 375,
    thirdOffsetY: 350,

    scale: .3,
    depth: 2,
    openedScale: 1.7,
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
    categories: ["Nov\nela", "Poe\nsía", "Tea\ntro", "Rom\nanc\ne", "Ave\nntu\nra", "Sus\npen\nse", "His\ntór\nico", "Pol\nici\naco", "Dra\nma", "Fan\ntas\nía", "Aca\ndém\nico", "Com\nedi\na", "Fic\nció\nn"],
    catSprites: ["novelaPost", "poesiaPost", "TeatroPost", "romancePost", "aventuraPost", "suspensePost", "historicoPost", "policiacoPost", "dramaPost", "fantasiaPost", "academicoPost", "comediaPost", "ficcionPost"],

    offsetX: -45,
    offsetY: -75,
    postItDiff: 5,

    scale: .15
}
export const alarmConst = {
    scale: .2
}
export const dialogueConst = {
    offsetX: -250,
    offsetY: -35,

    scale: .4
}
export const documentConst = {
    scale: .3,
    depth: 1
}
export const inkwellConst = {
    scale: .75
}
export const eventsConst = {
    moneyAmount: 200
}
export const penConst = {
    scale: .2,
    depth: 3
}
export const postItConst = {
    offsetX: -10,
    offsetY: -18,

    scale: .8
}
export const ruleConst = {
    offsetX: -270,
    offsetY: -260,
    offsetYAcum: 25,

    scale: .3,
    depth: 2,
    openedScale: .5,
    openedDepth: 4
}