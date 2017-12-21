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
    console.log("error: ");
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
};

/*
function remove() {
    let request = db.transaction(["variables"], "readwrite")
        .objectStore("variables")
        .delete("1");

    request.onsuccess = function(event) {
        console.log('del');
    };
}
*/
request.onupgradeneeded = (event) =>{
        let db = event.target.result;
        let objectStore = db.createObjectStore("variables", {keyPath: "id"});
        console.log('save2');
        let employeeData = [
            { id: "1", variable: Number(numberOfCookies.innerText) },
            { id: "2", variable: Number(incomePerS.innerText) }
        ];
        for (let i in employeeData) {
            objectStore.add(employeeData[i]);
        }
};

let update = () =>{
    console.log("gogo");
    var objectStore = db.transaction(["variables"], "readwrite").objectStore("variables");
    var request = objectStore.get("1");
    request.onerror = function(event) {
        // Handle errors!
    };
    request.onsuccess = function(event) {
        // Get the old value that we want to update
        var data = event.target.result;

        // update the value(s) in the object that you want to change
        data.variable = Number(numberOfCookies.innerText);

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function(event) {
            console.log("dzała")
        };
        requestUpdate.onsuccess = function(event) {
            console.log("nie działa")
        };
    };
};
let update2 = () =>{
    console.log("gogo");
    var objectStore = db.transaction(["variables"], "readwrite").objectStore("variables");
    var request = objectStore.get("2");
    request.onerror = function(event) {
        // Handle errors!
    };
    request.onsuccess = function(event) {
        // Get the old value that we want to update
        var data = event.target.result;

        // update the value(s) in the object that you want to change
        data.variable = Number(incomePerS.innerText);
        console.log(Number(incomePerS.innerText));

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function(event) {
            console.log("dzała")
        };
        requestUpdate.onsuccess = function(event) {
            console.log("nie działa")
        };
    };
};

let upt = ()=>{
    update();
    update2();
};

function read() {
    var transaction = db.transaction(["variables"]);
    var objectStore = transaction.objectStore("variables");
    var request = objectStore.get("1");
    request.onerror = function(event) {
        console.log("errorrrr")
    };
    request.onsuccess = function(event) {
        console.log("działaaa kurwa");
        numberOfCookies.innerText = request.result.variable
    };
}

function read2() {
    var transaction = db.transaction(["variables"]);
    var objectStore = transaction.objectStore("variables");
    var request = objectStore.get("2");
    request.onerror = function(event) {
        console.log("errorrrr")
    };
    request.onsuccess = function(event) {
        console.log("działaaa kurwa");
        incomePerS.innerText = request.result.variable
    };
}

let intervalAddIncome2 = ()=>{setInterval(() => (upt()), 5000)};
intervalAddIncome2();

var x = document.getElementById('load');

x.addEventListener('click', function () {
    read();
    read2()
});


document.addEventListener("DOMContentLoaded", function() {
    init();
    intervalAddIncome();
});
//cookieImg.addEventListener('click', function () {
//    update();

//});

/*
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
    // Handle errors!
};
request.onsuccess = function(event) {
    // Get the old value that we want to update
    var data = event.target.result;

    // update the value(s) in the object that you want to change
    data.age = 42;

    // Put this updated object back into the database.
    var requestUpdate = objectStore.put(data);
    requestUpdate.onerror = function(event) {
        // Do something with the error
    };
    requestUpdate.onsuccess = function(event) {
        // Success - the data is updated!
    };
};
*/
//let intervalAddIncome2 = ()=>{setInterval(() => (saveGame()), 10000)};

//intervalAddIncome2();
/*
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let request = window.indexedDB.open("MyDatabase", 3);

console.log(request);

request.onupgradeneeded = function (e) {
    console.log("upg")
};
request.onerror = function (e) {
    console.log("Error");
};
request.onsuccess = function (e) {
    console.log("suc")
};
*/
/*
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
    window.alert("Unfortunately, you can't save the game. You should update your browser");
}

let request = window.indexedDB.open("MyDatabase", 1),
    db,
    tx,
    store,
    index;

request.onupgradeneeded = function (e) {
  let db = request.result,
  store = db.createObjectStore("QuestionStore",{
      keyPath: "qID"});
  index = store.createIndex("questionText", "questionTest", {unique:false});
};

request.onerror = function (e) {
    console.log("Error" + e.target.errorCode);
};

request.onsuccess = function (e) {
    db = request.result;
    //tx = db.transaction("QuestionStore", "readwrite");
    store = tx.objectStore("QuestionStore");
    index = store.index("questionText");

    db.onerror = function (e) {
        console.log("Error" + e.target.errorCode);
    };

    let q1 = store.get(1);
    let qs = index.get("The grass in green.");

    q1.onsuccess = function () {
        console.log(q1.result);
        console.log(q1.result.questionTest);
    };
    tx.oncomplete = function () {
        db.close();
    };
};



*/