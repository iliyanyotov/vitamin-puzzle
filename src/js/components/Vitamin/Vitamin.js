'use strict';

const Utils     = require('../../utils/Utils.js');
const Texts     = require('../../texts/Texts.js');
const TimeLine  = require('../TimeLine/TimeLine.js');

/**
 * Vitamin class
 * @class
 */
class Vitamin {

    /**
     * @static
     * @type {number}
     */
    static INITIAL_SIZE = 3;

    /**
     * @static
     * @type {Object} {{WHITE: string, GREY: string, BLACK: string}}
     */
    static COLORS = {
        WHITE:  'W',
        GREY:   'G',
        BLACK:  'B'
    };

    /**
     * Check if the passed value is a valid size
     * @static
     * @param {*} size
     * @returns {boolean}
     */
    static isValidSize (size) {
        return Utils.isInteger(size) && size >= this.INITIAL_SIZE;
    }

    /**
     * Check if the passed value is a valid color
     * @static
     * @param {*} color
     * @returns {boolean}
     */
    static isValidColor (color) {
        return Object.values(this.COLORS).includes(color);
    }

    /**
     * Get vitamin size from the line
     * @static
     * @param {string} line
     * @returns {number}
     */
    static getSize (line) {
        let size = line.match(/\d+/);
        if (size !== null) size = parseInt(size[0]);
        if (! Vitamin.isValidSize(size)) throw new Error(Texts.INVALID_SIZE(size));
        return size;
    }

    /**
     * Get vitamin color from the line
     * @static
     * @param {string} line
     * @returns {string}
     */
    static getColor (line) {
        let color = line.replace(/\d+/, '');
        if (! Vitamin.isValidColor(color)) throw new Error(Texts.INVALID_COLOR(color));
        return color;
    }

    /**
     * Get color name by the color value
     * @param {string} colorVal
     * @returns {string}
     */
    static getColorName (colorVal) {
        for (let color in this.COLORS) {
            if (this.COLORS.hasOwnProperty(color) && colorVal === this.COLORS[color]) return color;
        }
    }

    /**
     * @type {string}
     * @public
     */
    value = '';

    /**
     * @type {number}
     * @public
     */
    size = 0;

    /**
     * @type {string}
     * @public
     */
    color = '';

    /**
     * @type {HTMLElement}
     * @public
     */
    element = null;

    /**
     * @type {Object} {{W: string, G: string, B: string}}
     * @private
     */
    _HEX_COLORS = {
        W: '#fff',
        G: '#D0D0D0',
        B: '#000'
    };

// ----------------------------------------------------------------------------

    /**
     * @param {string} vitamin
     * @constructor
     */
    constructor (vitamin) {
        this.value = vitamin;
        this.size = Vitamin.getSize(vitamin);
        this.color = Vitamin.getColor(vitamin);
        this.element = this._createVitamin();

        // Load the initial color
        let isInitial = true;
        this.changeColor(this.color, isInitial);
    }

// Public methods -------------------------------------------------------------

    /**
     * Change vitamin color
     * @param {string} color
     * @param {boolean} [isInitial = false]
     * @param {function} [callback]
     * @public
     */
    changeColor (color, isInitial = false, callback) {
        if (! Vitamin.isValidColor(color)) throw new Error(Texts.INVALID_COLOR(color));

        let delay = isInitial ? TimeLine.initialDelay : TimeLine.delay;

        TimeLine.queue.to(this.element, TimeLine.speed, {
            delay:              delay,
            backgroundColor:    this._HEX_COLORS[color],
            onComplete:         this._handleColorChange.bind(this, {
                color: color,
                oldColor: this.color,
                isInitial,
                callback
            })
        });

        this.color = color;
        this.value = `${this.size}${this.color}`;
    }

// Private methods ------------------------------------------------------------

    /**
     * Create the vitamin element
     * @returns {HTMLElement}
     * @private
     */
    _createVitamin () {
        let node = document.createElement('div');
        node.classList.add('vitamin');
        node.innerHTML = `${this.size}`;
        return node;
    }

    /**
     * Handle color change
     * @param {Object} data
     * @private
     */
    _handleColorChange (data) {
        let {color, oldColor, isInitial, callback} = data;

        if (isInitial) {
            console.log(Texts.COLOR_INITIAL(this.size, Vitamin.getColorName(color)));
        } else {
            console.log(Texts.COLOR_CHANGE(this.size, Vitamin.getColorName(oldColor), Vitamin.getColorName(color)));
        }

        // Checks if the target color is the same as the current when its not the initial loading
        if (oldColor === color && ! isInitial) console.warn(Texts.SAME_COLOR(this.size, Vitamin.getColorName(color)));

        // Calling the callback if available
        if (Utils.isFunction(callback)) callback.call(this);
    }
}

module.exports = Vitamin;