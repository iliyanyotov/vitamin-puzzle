'use strict';

const Polyfils  = require('./utils/Polyfills.js');
const Debug     = require('./debug/Debug.js');
const Line      = require('./components/Line/Line.js');
const TimeLine  = require('./components/TimeLine/TimeLine.js');

/**
 * App class
 * @class
 */
class App {

    /**
     * @type {Line}
     * @private
     */
    _line = null;

    /**
     * @type {Debug}
     * @private
     */
    _debug = null;

    /**
     * @type {object}
     * @private
     */
    _presets = {
        animations: {
            title: 'Animation',
            open: true,
            props: [
                'pause',
                'resume',
                'restart'
            ]
        },
        line: {
            title: 'Vitamins tasks',
            open: true,
            props: [
                'simpleLine',
                //'makeAllWhite',
                'changeState',
                'loadOperations',
                'combination'
            ]
        }
    };

// ----------------------------------------------------------------------------

    /**
     * @constructor
     */
    constructor () {
        this._init();
    }

// Public methods -------------------------------------------------------------


// Private methods ------------------------------------------------------------

    /**
     * Initialization
     * @private
     */
    _init () {
        this._line = new Line('3B 4B');
        this._line.makeAllWhite();
        console.info('Use the controls to change the state and pass operations!');

        this._debug = new Debug();
        this._debug.loadPresets(this._presets['animations'], TimeLine);
        this._debug.loadPresets(this._presets['line'], this);
    }

// Line preset methods --------------------------------------------------------

    simpleLine () {
        this._line = new Line('3B 4G 5B 6W');
    }

    makeAllWhite () {
        this._line = new Line('3G 4G 5B 6W');
        //this._line.makeAllWhite();
    }

    changeState () {
        this._line = new Line('3W 4B 5B 6G');
        this._line.changeState('3G');
        this._line.changeState('3B 5G');
        this._line.changeState('5W 6W');
    }

    loadOperations () {
        this._line = new Line('3G 4G 5B 6W', [
            [4, 'G', 'B'],
            [3, 'G', 'W'],
            [6, 'W', 'B'],
            [5, 'B', 'G'],
            [3, 'W', 'B']
        ]);
    }

    combination () {
        this._line = new Line('3B 4G 5W 6G', [
            [3, 'B', 'G'],
            [4, 'G', 'W'],
            [5, 'W', 'B'],
            [6, 'G', 'W'],
            [4, 'W', 'B']
        ]);

        this._line.changeState('5G 6B');
        this._line.changeState('3B');
        this._line.changeState('3W 5B');
        this._line.changeState('3G');
        this._line.changeState('6W 4W 5W 3W');
        //this._line.makeAllWhite();
    }
}

window.app = new App();
