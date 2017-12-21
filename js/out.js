/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberOfCookies = document.getElementById('cookieCalc');
var cookieImg = document.getElementById('cookieImage');
var incomePerS = document.getElementById('income');
var images = document.getElementsByClassName('img');
var newGame = document.getElementById('newGameBtn');
var bagForRest = 0;

// Cursor properties
var cursorPrice = document.getElementById('cursorPrice');
var cursorIncome = document.getElementById('cursorIncome');
var cursorCounter = document.getElementById('cursorCounter');
// Grandma properties
var grandmaPrice = document.getElementById('grandmaPrice');
var grandmaIncome = document.getElementById('grandmaIncome');
var grandmaCounter = document.getElementById('grandmaCounter');
// Farm properties
var farmPrice = document.getElementById('farmPrice');
var farmIncome = document.getElementById('farmIncome');
var farmCounter = document.getElementById('farmCounter');
// Bakery properties
var bakeryPrice = document.getElementById('bakeryPrice');
var bakeryIncome = document.getElementById('bakeryIncome');
var bakeryCounter = document.getElementById('bakeryCounter');
// Mine properties
var minePrice = document.getElementById('minePrice');
var mineIncome = document.getElementById('mineIncome');
var mineCounter = document.getElementById('mineCounter');

// Simple add cookies by click
cookieImg.addEventListener("click", function () {
    numberOfCookies.innerText++;
});

// Functions to change properties
var incomeCounter = function incomeCounter() {
    var result = Number(mineIncome.innerText) + Number(bakeryIncome.innerText) + Number(farmIncome.innerText) + Number(grandmaIncome.innerText) + Number(cursorIncome.innerText);
    return incomePerS.innerText = result;
};
var addPrice = function addPrice(price) {
    return Math.floor(Number(price.innerText) * 1.15);
};
var addIncome = function addIncome(add, actual) {
    var act = Number(actual.innerText);
    return actual.innerText = (act + add).toFixed(2);
};

//tabs with properties
var firstPrices = [15, 100, 1100, 12000, 130000];
var prices = [cursorPrice, grandmaPrice, farmPrice, bakeryPrice, minePrice];
var counters = [cursorCounter, grandmaCounter, farmCounter, bakeryCounter, mineCounter];
var incomes = [cursorIncome, grandmaIncome, farmIncome, bakeryIncome, mineIncome];
var incomesValue = [0.1, 1, 8, 47, 260]; // Values of incomes - if need to change do it only here

//main function to init game
var init = function init() {
    var _loop = function _loop(i) {
        images[i].addEventListener('click', function () {
            if (Number(numberOfCookies.innerText) >= Number(prices[i].innerText)) {
                numberOfCookies.innerText = Number(numberOfCookies.innerText) - Number(prices[i].innerText);
                prices[i].innerText = addPrice(prices[i]);
                addIncome(incomesValue[i], incomes[i]);
                incomeCounter();
                counters[i].innerText++;
            }
        });
    };

    for (var i = 0; i < images.length; i++) {
        _loop(i);
    }
};

//Function calculate value to add per second cookies
var calculateIncome = function calculateIncome() {
    var add = Number(numberOfCookies.innerText) + Number(incomePerS.innerText);
    var restOfadd = Number(incomePerS.innerText) - Math.floor(Number(incomePerS.innerText));
    bagForRest = bagForRest + restOfadd;
    bagForRest.toFixed(2);
    if (bagForRest >= 1) {
        add = add + 1;
        bagForRest = bagForRest - 1;
    }
    numberOfCookies.innerText = Math.floor(add);
};

var intervalAddIncome = function intervalAddIncome() {
    setInterval(function () {
        return calculateIncome();
    }, 1000);
}; // interval adding value per second

//Clear all variables, need to start new game.
var clearVariables = function clearVariables() {
    for (var i = 0; i < images.length; i++) {
        prices[i].innerText = firstPrices[i];
        counters[i].innerText = 0;
        incomes[i].innerText = 0;
    }
    incomePerS.innerText = 0;
    numberOfCookies.innerText = 0;
};

newGame.addEventListener('click', function () {
    clearVariables();
});

// ========== indexedDB =============

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB so i cant save your game");
}

var db = void 0;
var request = window.indexedDB.open("Database", 1); //create new database

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
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
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("variables", { keyPath: "id" });
    console.log('save2');
    var employeeData = [{ id: "1", variable: Number(numberOfCookies.innerText) }, { id: "2", variable: Number(incomePerS.innerText) }];
    for (var i in employeeData) {
        objectStore.add(employeeData[i]);
    }
};

var update = function update() {
    console.log("gogo");
    var objectStore = db.transaction(["variables"], "readwrite").objectStore("variables");
    var request = objectStore.get("1");
    request.onerror = function (event) {
        // Handle errors!
    };
    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = event.target.result;

        // update the value(s) in the object that you want to change
        data.variable = Number(numberOfCookies.innerText);

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {
            console.log("dzała");
        };
        requestUpdate.onsuccess = function (event) {
            console.log("nie działa");
        };
    };
};
var update2 = function update2() {
    console.log("gogo");
    var objectStore = db.transaction(["variables"], "readwrite").objectStore("variables");
    var request = objectStore.get("2");
    request.onerror = function (event) {
        // Handle errors!
    };
    request.onsuccess = function (event) {
        // Get the old value that we want to update
        var data = event.target.result;

        // update the value(s) in the object that you want to change
        data.variable = Number(incomePerS.innerText);
        console.log(Number(incomePerS.innerText));

        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function (event) {
            console.log("dzała");
        };
        requestUpdate.onsuccess = function (event) {
            console.log("nie działa");
        };
    };
};

var upt = function upt() {
    update();
    update2();
};

function read() {
    var transaction = db.transaction(["variables"]);
    var objectStore = transaction.objectStore("variables");
    var request = objectStore.get("1");
    request.onerror = function (event) {
        console.log("errorrrr");
    };
    request.onsuccess = function (event) {
        console.log("działaaa kurwa");
        numberOfCookies.innerText = request.result.variable;
    };
}

function read2() {
    var transaction = db.transaction(["variables"]);
    var objectStore = transaction.objectStore("variables");
    var request = objectStore.get("2");
    request.onerror = function (event) {
        console.log("errorrrr");
    };
    request.onsuccess = function (event) {
        console.log("działaaa kurwa");
        incomePerS.innerText = request.result.variable;
    };
}

var intervalAddIncome2 = function intervalAddIncome2() {
    setInterval(function () {
        return upt();
    }, 5000);
};
intervalAddIncome2();

var x = document.getElementById('load');

x.addEventListener('click', function () {
    read();
    read2();
});

document.addEventListener("DOMContentLoaded", function () {
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

/***/ })
/******/ ]);