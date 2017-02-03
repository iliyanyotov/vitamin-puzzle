'use strict';

const Dat = require('dat-gui');

/**
 * Debug class
 * @class
 */
class Debug {

    /**
     * @type {Dat}
     * @public
     */
    instance = null;

// ----------------------------------------------------------------------------

    /**
     * @constructor
     */
    constructor () {
        this._create();
    }

// Public methods -------------------------------------------------------------

    /**
     * Load presets
     * @param {object} presets
     * @param {object} context
     */
    loadPresets (presets, context) {
        if (! this.instance) this._create();

        let folder = this.instance.addFolder(presets.title);
        presets.props.forEach(prop => folder.add(context, prop));

        if (presets.open) folder.open();
    }

// Private methods ------------------------------------------------------------

    /**
     * Create dat.Gui instance
     * @private
     */
    _create () {
        this.instance = new Dat.GUI();
    }
}

module.exports = Debug;