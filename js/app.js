const numberOfCookies = document.getElementById('cookieCalc');
const cookieImg = document.getElementById('cookieImage');
const incomePerS = document.getElementById('income');
const images = document.getElementsByClassName('img');
const newGame = document.getElementById('newGameBtn');
let bagForRest = 0;

// Cursor properties
const cursorPrice = document.getElementById('cursorPrice');
const cursorIncome = document.getElementById('cursorIncome');
const cursorCounter = document.getElementById('cursorCounter');
// Grandma properties
const grandmaPrice = document.getElementById('grandmaPrice');
const grandmaIncome = document.getElementById('grandmaIncome');
const grandmaCounter = document.getElementById('grandmaCounter');
// Farm properties
const farmPrice = document.getElementById('farmPrice');
const farmIncome = document.getElementById('farmIncome');
const farmCounter = document.getElementById('farmCounter');
// Bakery properties
const bakeryPrice = document.getElementById('bakeryPrice');
const bakeryIncome = document.getElementById('bakeryIncome');
const bakeryCounter = document.getElementById('bakeryCounter');
// Mine properties
const minePrice = document.getElementById('minePrice');
const mineIncome = document.getElementById('mineIncome');
const mineCounter = document.getElementById('mineCounter');

// Simple add cookies by click
cookieImg.addEventListener("click",  () => {
    numberOfCookies.innerText++;
});

// Functions to change properties
let incomeCounter = () => {
    let result = (Number(mineIncome.innerText)) + (Number(bakeryIncome.innerText)) +(Number(farmIncome.innerText)) +(Number(grandmaIncome.innerText)) +(Number(cursorIncome.innerText));
    return(incomePerS.innerText = result);
};
let addPrice = (price) => (Math.floor(Number(price.innerText)*1.15));
let addIncome = (add, actual) => {
    let act = Number(actual.innerText);
    return(actual.innerText = (act + add).toFixed(2));
};

//tabs with properties
let firstPrices = [15, 100, 1100, 12000, 130000];
let prices = [cursorPrice, grandmaPrice, farmPrice, bakeryPrice, minePrice];
let counters = [cursorCounter, grandmaCounter, farmCounter, bakeryCounter, mineCounter];
let incomes = [cursorIncome, grandmaIncome, farmIncome, bakeryIncome, mineIncome];
let incomesValue = [0.1, 1, 8, 47, 260]; // Values of incomes - if need to change do it only here

//main function to init game
let init = ()=>{
    for (let i=0; i<images.length; i++){
        images[i].addEventListener('click', () =>{
            if(Number(numberOfCookies.innerText) >= Number(prices[i].innerText)){
                numberOfCookies.innerText = Number(numberOfCookies.innerText) - Number(prices[i].innerText);
                prices[i].innerText = addPrice(prices[i]);
                addIncome(incomesValue[i], incomes[i]);
                incomeCounter();
                counters[i].innerText++;
            }
        });
    }
};

//Function calculate value to add per second cookies
let calculateIncome = () =>{
    let add = (Number(numberOfCookies.innerText) + Number(incomePerS.innerText));
    let restOfadd = Number(incomePerS.innerText) - Math.floor(Number(incomePerS.innerText));
    bagForRest = bagForRest + restOfadd;
    bagForRest.toFixed(2);
    if(bagForRest>=1){
        add = add+1;
        bagForRest = bagForRest - 1;
    }
    numberOfCookies.innerText = Math.floor(add);
};

let intervalAddIncome = ()=>{setInterval(() => (calculateIncome()), 1000)}; // interval adding value per second

//Clear all variables, need to start new game.
let clearVariables = ()=>{
    for (let i=0; i<images.length; i++){
        prices[i].innerText = firstPrices[i];
        counters[i].innerText = 0;
        incomes[i].innerText = 0;
    }
    incomePerS.innerText = 0;
    numberOfCookies.innerText = 0;
};

newGame.addEventListener('click', () =>{
   clearVariables()
});

// ========== indexedDB =============

let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB so i cant save your game")
}

let db;
let request = window.indexedDB.open("Database", 1); //create new database

request.onerror = function(event) {
};

//when request find database load a variables from data
request.onsuccess = function(event) {
    db = request.result;
    read()
};

//Tab with access to DOM elements
const accessTab = [numberOfCookies, incomePerS, cursorCounter, cursorPrice, cursorIncome, grandmaCounter, grandmaPrice,
    grandmaIncome, farmCounter, farmPrice, farmIncome, bakeryCounter, bakeryPrice, bakeryIncome, mineCounter, minePrice, mineIncome]
let variablesTab;

request.onupgradeneeded = (event) =>{
    let db = event.target.result;
    let objectStore = db.createObjectStore("variables", {keyPath: "id"});
    let employeeData = [
        {id: "0", name: "CookiesNumber", variable: Number(numberOfCookies.innerText) },
        {id: "1", name: "IncomePerSecond", variable: Number(incomePerS.innerText) },
        {id: "2", name: "NumberOfCursors", variable: Number(cursorCounter.innerText) },
        {id: "3", name: "CursorPrice", variable: Number(cursorPrice.innerText) },
        {id: "4", name: "CursorIncome", variable: Number(cursorIncome.innerText) },
        {id: "5", name: "NumberOfGrandmas", variable: Number(grandmaCounter.innerText) },
        {id: "6", name: "GrandmaPrice", variable: Number(grandmaPrice.innerText) },
        {id: "7", name: "GrandmaIncome", variable: Number(grandmaIncome.innerText) },
        {id: "8", name: "NumberOfFarms", variable: Number(farmCounter.innerText) },
        {id: "9", name: "FarmPrice", variable: Number(farmPrice.innerText) },
        {id: "10", name: "FarmIncome", variable: Number(farmIncome.innerText) },
        {id: "11", name: "NumberOfBakeries", variable: Number(bakeryCounter.innerText) },
        {id: "12", name: "BakeryPrice", variable: Number(bakeryPrice.innerText) },
        {id: "13", name: "BakeryIncome", variable: Number(bakeryIncome.innerText) },
        {id: "14", name: "NumberOfMines", variable: Number(mineCounter.innerText) },
        {id: "15", name: "MinePrice", variable: Number(minePrice.innerText) },
        {id: "16", name: "MineIncome", variable: Number(mineIncome.innerText) }
        ];
    for (let i in employeeData) {
        objectStore.add(employeeData[i]);
    }
};
//Load variables to database
let update = () =>{
    variablesTab = [Number(numberOfCookies.innerText), Number(incomePerS.innerText), Number(cursorCounter.innerText),
        Number(cursorPrice.innerText), Number(cursorIncome.innerText), Number(grandmaCounter.innerText), Number(grandmaPrice.innerText),
        Number(grandmaIncome.innerText), Number(farmCounter.innerText), Number(farmPrice.innerText), Number(farmIncome.innerText),
        Number(bakeryCounter.innerText), Number(bakeryPrice.innerText), Number(bakeryIncome.innerText), Number(mineCounter.innerText),
        Number(minePrice.innerText), Number(mineIncome.innerText)];
    let objectStore = db.transaction(["variables"], "readwrite").objectStore("variables");
    for(let i=0; i<variablesTab.length; i++) {
        let request = objectStore.get(`${i}`);
        request.onsuccess = function (event) {
            let data = event.target.result;
            data.variable = variablesTab[i];
            let requestUpdate = objectStore.put(data);
            requestUpdate.onerror = function (event) {
            };
            requestUpdate.onsuccess = function (event) {
                console.log(i)
            };
        };
    }
};

//Load variables from database
let read = () =>{
    let transaction = db.transaction(["variables"]);
    let objectStore = transaction.objectStore("variables");
    for(let i=0; i<accessTab.length; i++) {
        let request = objectStore.get(`${i}`);
        request.onerror = function (event) {
        };
        request.onsuccess = function (event) {
            accessTab[i].innerText = request.result.variable;
        };
    }
};

//Save game every 3 seconds
let save = ()=>{setInterval(() => (update()), 3000)};

document.addEventListener("DOMContentLoaded", function() {
    init();
    intervalAddIncome();
    save();
});
