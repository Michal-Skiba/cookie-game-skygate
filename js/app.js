const numberOfCookies = document.getElementById('cookieCalc');
const cookieImg = document.getElementById('cookieImage');
const incomePerS = document.getElementById('income');

// Cursor properties
const cursorImg = document.getElementById('cursor');
const cursorPrice = document.getElementById('cursorPrice');
const cursorIncome = document.getElementById('cursorIncome');
const cursorCounter = document.getElementById('cursorCounter');
// Grandma properties
const grandmaImg = document.getElementById('grandma');
const grandmaPrice = document.getElementById('grandmaPrice');
const grandmaIncome = document.getElementById('grandmaIncome');
const grandmaCounter = document.getElementById('grandmaCounter');
// Farm properties
const farmImg = document.getElementById('farm');
const farmPrice = document.getElementById('farmPrice');
const farmIncome = document.getElementById('farmIncome');
const farmCounter = document.getElementById('farmCounter');
// Bakery properties
const bakeryImg = document.getElementById('bakery');
const bakeryPrice = document.getElementById('bakeryPrice');
const bakeryIncome = document.getElementById('bakeryIncome');
const bakeryCounter = document.getElementById('bakeryCounter');
// Mine properties
const mineImg = document.getElementById('mine');
const minePrice = document.getElementById('minePrice');
const mineIncome = document.getElementById('mineIncome');
const mineCounter = document.getElementById('mineCounter');

// Simple add cookies by click
cookieImg.addEventListener("click", function () {
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

// Listener of cursor
cursorImg.addEventListener("click",  () => {
    if (Number(numberOfCookies.innerText) >= Number(cursorPrice.innerText)){
        numberOfCookies.innerText = numberOfCookies.innerText - cursorPrice.innerText; // pay for cursor
        cursorPrice.innerText = addPrice(cursorPrice); //change price
        addIncome(0.1, cursorIncome); // add income | Value of income of cursor
        cursorCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of grandma
grandmaImg.addEventListener("click",  () => {
    if (Number(numberOfCookies.innerText) >= Number(grandmaPrice.innerText)){
        numberOfCookies.innerText = numberOfCookies.innerText - grandmaPrice.innerText; // pay for cursor
        grandmaPrice.innerText = addPrice(grandmaPrice); //change price
        addIncome(1, grandmaIncome); // add income | Value of income of grandma
        grandmaCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of  farm
farmImg.addEventListener("click",  () => {
    if (Number(numberOfCookies.innerText) >= Number(farmPrice.innerText)){
        numberOfCookies.innerText = numberOfCookies.innerText - farmPrice.innerText; // pay for cursor
        farmPrice.innerText = addPrice(farmPrice); //change price
        addIncome(1, farmIncome); // add income | Value of income of farm
        farmCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of bakery
bakeryImg.addEventListener("click",  () => {
    if (Number(numberOfCookies.innerText) >= Number(bakeryPrice.innerText)){
        numberOfCookies.innerText = numberOfCookies.innerText - bakeryPrice.innerText; // pay for cursor
        bakeryPrice.innerText = addPrice(bakeryPrice); //change price
        addIncome(1, bakeryIncome); // add income | Value of income of bakery
        bakeryCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of  mine
mineImg.addEventListener("click",  () => {
    if (Number(numberOfCookies.innerText) >= Number(minePrice.innerText)){
        numberOfCookies.innerText = numberOfCookies.innerText - minePrice.innerText; // pay for cursor
        minePrice.innerText = addPrice(minePrice); //change price
        addIncome(1, mineIncome); // add income | Value of income of mine
        mineCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});






//let intPointer = setInterval(()=> (counter<=n)?console.log('hello'+counter++):clearInterval(intPointer), 500)