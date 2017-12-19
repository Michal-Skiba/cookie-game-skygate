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
    console.log(bagForRest.toFixed(2));
    if(bagForRest>=1){
        console.log("tutaj");
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

document.addEventListener("DOMContentLoaded", function() {
    init();
    intervalAddIncome();
});

