'use strict';

/**
 * Utilities class
 * @class
 */
class Utils {

    /**
     * Utility to check if given value is a string
     * @static
     * @param {*} str
     * @returns {boolean}
     */
    static isString (str) {
        return typeof str === 'string';
    }

    /**
     * Utility to check if given value is a integer
     * @static
     * @param {*} num
     * @returns {boolean}
     */
    static isInteger (num) {
        return Number.isInteger(num);
    }

    /**
     * Utility to check if given value is a function
     * Using lodash/underscore approach
     * @static
     * @param {*} fun
     * @returns {boolean}
     */
    static isFunction (fun) {
        return !! (fun && fun.constructor && fun.call && fun.apply);
    }

    /**
     * Utility to check if given array is empty
     * @static
     * @param {*} arr
     * @returns {boolean}
     */
    static isEmptyArray (arr) {
        return Array.isArray(arr) && arr.length === 0;
    }
}

module.exports = Utils;