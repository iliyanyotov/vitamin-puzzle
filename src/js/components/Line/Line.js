'use strict';

const Utils     = require('../../utils/Utils.js');
const Texts     = require('../../texts/Texts.js');
const TimeLine  = require('../TimeLine/TimeLine.js');
const Vitamin   = require('../Vitamin/Vitamin.js');

/**
 * Line class
 * @class
 */
class Line {

    /**
     * @type {string}
     * @public
     */
    line = '';

    /**
     * @type {Array}
     * @public
     */
    operations = [];

    /**
     * @type {Array}
     * @public
     */
    vitamins = [];

    /**
     * @type {object}
     * @public
     */
    groups = {};

    /**
     * @type {HTMLElement}
     * @private
     */
    _container = null;

    /**
     * @type {Array}
     * @private
     */
    _usedSizes = [];

// ----------------------------------------------------------------------------

    /**
     * @param {string} line
     * @param {Array} [operations = []]
     * @constructor
     */
    constructor (line, operations = []) {
        // console.group()
        console.log(Texts.SEPARATOR);
        console.log(Texts.DEBUGGING_TITLE);

        if (! Utils.isString(line))         throw new Error(Texts.NOT_A_STRING(line));
        if (! Array.isArray(operations))    throw new Error(Texts.NOT_AN_ARRAY(operations));

        this.line = line;
        this.operations = operations;

        console.log('Line:', this.line);
        console.log('Operations:', this.operations);

        // Clear the current tweens from the timeline
        TimeLine.clear();

        this._container = document.querySelector('.vitamins');
        this.vitamins = this._createVitamins(line);
        this._arrangeVitaminsBySize();
        this._groupVitamins();
        this._renderVitamins();

        if (! Utils.isEmptyArray(this.operations)) this._changeLineState();
    }

// Public methods -------------------------------------------------------------

    /**
     * Change vitamins colors by passing new line
     * @param {string} line
     * @public
     */
    changeState (line) {
        if (! Utils.isString(line)) throw new Error(Texts.NOT_A_STRING(line));
        let size, color, vitamin;

        console.log(`Update line: ${line}`);

        line.split(' ').forEach(vitValue => {
            size = Vitamin.getSize(vitValue);
            color = Vitamin.getColor(vitValue);

            vitamin = this._getVitaminBySize(size);
            if (vitamin) {
                vitamin.changeColor(color);
            } else {
                console.warn(Texts.UNDEFINED_VITAMIN(size));
            }
        });
    }

// Private methods ------------------------------------------------------------

    /**
     * Get vitamin by value
     * @param {string} value
     * @returns {*}
     * @private
     */
    _getVitaminByValue (value) {
        return this._getVitaminByProp('value', value);
    }

    /**
     * Get vitamin by size
     * @param {number} value
     * @returns {*}
     * @private
     */
    _getVitaminBySize (value) {
        return this._getVitaminByProp('size', value);
    }

    /**
     * Get vitamin by certain passed property
     * @param {string} prop
     * @param {string|number} value
     * @returns {*}
     * @private
     */
    _getVitaminByProp (prop, value) {
        let props = ['value', 'size', 'color'];
        if (props.includes(prop)) return this.vitamins.find(vit => vit[prop] === value);
    }

    /**
     * Create vitamins from the passed line
     * @param {string} line
     * @returns {Array}
     * @private
     */
    _createVitamins (line) {
        let vitamin, vitamins = [];

        line.split(' ').forEach(vit => {
            vitamin = new Vitamin(vit);
            vitamins.push(vitamin);

            // Check for repeating vitamins by size
            if (this._usedSizes.includes(vitamin.size)) throw new Error(Texts.REPEATING_SIZE(vitamin.size));
            this._usedSizes.push(vitamin.size);
        });

        return vitamins;
    }

    /**
     * Arrange the vitamins by size starting from 3 {Vitamin.INITIAL_SIZE}
     * @private
     */
    _arrangeVitaminsBySize () {
        this.vitamins = this.vitamins.sort((currVit, nextVit) => currVit.size > nextVit.size);

        // Vitamins are arranged without whitespaces starting from 3 to N
        let size = Vitamin.INITIAL_SIZE;
        this.vitamins.forEach(vit => {
            if (vit.size !== size) throw new Error(Texts.MISSING_VITAMIN(size));
            size++;
        });

        console.log('Arranged vitamins:', this.vitamins);
    }

    /**
     * Group the the vitamins by colors
     * @private
     */
    _groupVitamins () {
        let mini, maxi;

        this.groups = {};
        this.vitamins.forEach(vit => {
            if (! this.groups[vit.color]) this.groups[vit.color] = { vitamins: [], mini: null, maxi: null };

            // Set mini in color group
            mini = this.groups[vit.color].mini;
            if (! mini || vit.size < mini) {
                this.groups[vit.color].mini = vit.size;
            }

            // Set maxi in color group
            maxi = this.groups[vit.color].maxi;
            if (! maxi || vit.size > maxi) {
                this.groups[vit.color].maxi = vit.size;
            }

            this.groups[vit.color].vitamins.push(vit);
        });

        // Create the empty groups with no vitamins
        Object.values(Vitamin.COLORS).forEach(color => {
            if (! this.groups[color]) {
                this.groups[color] = { vitamins: [], mini: null, maxi: null };
                // console.log(Texts.EMPTY_GROUP(color));
            }
        });

        //console.log('Grouped by colors:', this.groups);
    }

    /**
     * Render the vitamins into the container
     * @private
     */
    _renderVitamins () {
        this._emptyContainer();
        this.vitamins.forEach(vit => this._container.appendChild(vit.element));
        console.log(Texts.RENDERING_VITAMINS);
    }

    /**
     * Empty the vitamins DOM container
     * @private
     */
    _emptyContainer () {
        if (this._container) this._container.innerHTML = '';
    }

// 3A TASK --------------------------------------------------------------------

    /**
     * Change line stated by passing new line
     * @private
     */
    _changeLineState () {
        let vitamin, size, color, targetColor, states = [], isLastOperation;

        let handleOperations = () => {
            console.log(`States[${states.length}]:`);
            console.log(JSON.stringify(states, null, 4));
        };

        states.push(this.line);

        this.operations.forEach((operation, index) => {
            if (! Array.isArray(operation)) throw new Error(Texts.NOT_AN_ARRAY(operation));

            size        = operation[0];
            color       = operation[1];
            targetColor = operation[2];

            if (! Vitamin.isValidSize(size))            throw new Error(Texts.INVALID_SIZE(size));
            if (! Vitamin.isValidColor(color))          throw new Error(Texts.INVALID_COLOR(color));
            if (! Vitamin.isValidColor(targetColor))    throw new Error(Texts.INVALID_COLOR(targetColor));

            vitamin = this._getVitaminBySize(size);
            if (! vitamin) throw new Error(Texts.UNDEFINED_VITAMIN(size));

            if (vitamin.color !== color) console.warn(Texts.WRONG_CURRENT_COLOR(vitamin.size, Vitamin.getColorName(vitamin.color), Vitamin.getColorName(color)));

            isLastOperation = (index === this.operations.length - 1);
            vitamin.changeColor(targetColor, false, isLastOperation ? handleOperations : null);

            states.push(this._destructCurrentVitamins());
        });

        //return JSON.stringify(states, null, 4);
    }

    /**
     * Destruct the current vitamin state to a string
     * @returns {string}
     * @private
     */
    _destructCurrentVitamins () {
        let vitaminStr = [];
        this.vitamins.forEach(vit => vitaminStr.push(vit.value));
        return vitaminStr.join(' ');
    }

// 1A TASK --------------------------------------------------------------------

    /**
     * Performing the color swap using the maxi-maxi principle
     * @public
     */
    makeAllWhite () {
        let actions = [],
            iterations = 0;

        console.log('MAXI-MAXI: Making all vitamins white!');

        let biggest = this._getBiggestVitamin().size;
        let neededMoves = Math.pow(2, this.vitamins.length) - 1;

        let move = (vitamin, from, to, using) => {
            iterations++;
            let curr = this._getVitaminBySize(vitamin);
            if (curr.size === biggest) {
                actions.push(curr.changeColor(to));

                if (iterations === neededMoves) {
                    console.log(`Iterations: ${iterations}`);
                    console.log('Actions: ');
                    console.log(JSON.stringify(actions, null, 4));
                }
            } else {
                move(curr.size + 1, from, using, to);
                actions.push(curr.changeColor(to));
                move(curr.size + 1, using, to, from);
            }
        };

        let firstVit = this._getVitaminBySize(Vitamin.INITIAL_SIZE);
        let using = Object.values(Vitamin.COLORS).find(color => {
            return  color !== Vitamin.COLORS.WHITE &&
                    color !== firstVit.color
        });

        move(firstVit.size, firstVit.color, Vitamin.COLORS.WHITE, using);
        // return JSON.stringify(actions, null, 4);
    }

    /**
     * Get biggest vitamin (vitamins should be arranged)
     * @returns {Vitamin}
     * @private
     */
    _getBiggestVitamin () {
        return this.vitamins[this.vitamins.length - 1];
    }
}

module.exports = Line;