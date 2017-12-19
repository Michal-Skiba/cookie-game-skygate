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
    console.log(bagForRest.toFixed(2));
    if (bagForRest >= 1) {
        console.log("tutaj");
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

document.addEventListener("DOMContentLoaded", function () {
    init();
    intervalAddIncome();
});

/***/ })
/******/ ]);