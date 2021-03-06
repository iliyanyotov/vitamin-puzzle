'use strict';

/**
 * Using polyfill/shim for Number.isInteger because its not supported yet in IE
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger}
 */
const isInteger = require('is-integer');
Number.isInteger = Number.isInteger || isInteger;

/**
 * Using polyfill/shim for Object.values because its proposed for ES7 and currently is in draft state
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values}
 */
const objectValues = require('object-values');
Object.values = Object.values || objectValues;

/**
 * Using polyfill/shim for Array.includes because its not implement in all browsers (ES6 standard)
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes}
 */
const arrayIncludes = require('array-includes');
Array.includes = Array.includes || arrayIncludes;