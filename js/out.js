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

// Cursor properties
var cursorImg = document.getElementById('cursor');
var cursorPrice = document.getElementById('cursorPrice');
var cursorIncome = document.getElementById('cursorIncome');
var cursorCounter = document.getElementById('cursorCounter');
// Grandma properties
var grandmaImg = document.getElementById('grandma');
var grandmaPrice = document.getElementById('grandmaPrice');
var grandmaIncome = document.getElementById('grandmaIncome');
var grandmaCounter = document.getElementById('grandmaCounter');
// Farm properties
var farmImg = document.getElementById('farm');
var farmPrice = document.getElementById('farmPrice');
var farmIncome = document.getElementById('farmIncome');
var farmCounter = document.getElementById('farmCounter');
// Bakery properties
var bakeryImg = document.getElementById('bakery');
var bakeryPrice = document.getElementById('bakeryPrice');
var bakeryIncome = document.getElementById('bakeryIncome');
var bakeryCounter = document.getElementById('bakeryCounter');
// Mine properties
var mineImg = document.getElementById('mine');
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

// Listener of cursor
cursorImg.addEventListener("click", function () {
    if (Number(numberOfCookies.innerText) >= Number(cursorPrice.innerText)) {
        numberOfCookies.innerText = numberOfCookies.innerText - cursorPrice.innerText; // pay for cursor
        cursorPrice.innerText = addPrice(cursorPrice); //change price
        addIncome(0.1, cursorIncome); // add income | Value of income of cursor
        cursorCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of grandma
grandmaImg.addEventListener("click", function () {
    if (Number(numberOfCookies.innerText) >= Number(grandmaPrice.innerText)) {
        numberOfCookies.innerText = numberOfCookies.innerText - grandmaPrice.innerText; // pay for cursor
        grandmaPrice.innerText = addPrice(grandmaPrice); //change price
        addIncome(1, grandmaIncome); // add income | Value of income of grandma
        grandmaCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of  farm
farmImg.addEventListener("click", function () {
    if (Number(numberOfCookies.innerText) >= Number(farmPrice.innerText)) {
        numberOfCookies.innerText = numberOfCookies.innerText - farmPrice.innerText; // pay for cursor
        farmPrice.innerText = addPrice(farmPrice); //change price
        addIncome(1, farmIncome); // add income | Value of income of farm
        farmCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of bakery
bakeryImg.addEventListener("click", function () {
    if (Number(numberOfCookies.innerText) >= Number(bakeryPrice.innerText)) {
        numberOfCookies.innerText = numberOfCookies.innerText - bakeryPrice.innerText; // pay for cursor
        bakeryPrice.innerText = addPrice(bakeryPrice); //change price
        addIncome(1, bakeryIncome); // add income | Value of income of bakery
        bakeryCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});
// Listener of  mine
mineImg.addEventListener("click", function () {
    if (Number(numberOfCookies.innerText) >= Number(minePrice.innerText)) {
        numberOfCookies.innerText = numberOfCookies.innerText - minePrice.innerText; // pay for cursor
        minePrice.innerText = addPrice(minePrice); //change price
        addIncome(1, mineIncome); // add income | Value of income of mine
        mineCounter.innerText++; //change number of upgrades
        incomeCounter();
    }
});

//let intPointer = setInterval(()=> (counter<=n)?console.log('hello'+counter++):clearInterval(intPointer), 500)

/***/ })
/******/ ]);