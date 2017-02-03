'use strict';

/**
 * Texts class
 * @class
 */
class Texts {

// Generic texts --------------------------------------------------------------

    static SEPARATOR = '-------------------------------------';

    static DEBUGGING_TITLE = 'Vitamins debugging:';

    static RENDERING_VITAMINS = 'Rendering the vitamins!';

    static ALL_VITAMINS_WHITE = 'All vitamins are white :)!';

// TimeLine texts -------------------------------------------------------------

    static ANIMATION_RESUMED = '# Animation resumed!';

    static ANIMATION_PAUSED = '# Animation paused!';

    static ANIMATION_NOT_PAUSED = '# The animation is not paused!';

    static ANIMATION_NOT_RESUMED = '# The animation is not resumed!';

    static ANIMATION_STOPPED = '# Animation stopped completely!';

    static ANIMATION_RESTARTED = '# Animation restarted!';

    static ANIMATION_TIMELINE_CLEARED = '# Animation timeline cleared!';

// Error messages -------------------------------------------------------------

    static NOT_A_STRING (value) {
        return `Please enter a string: ${value}!`;
    }

    static NOT_AN_ARRAY (value) {
        return `Please enter an array: ${value}!`;
    }

    static NOT_AN_OBJECT (value) {
        return `Please enter an object: ${value}!`;
    }

// Color error messages -------------------------------------------------------

    static INVALID_COLOR (color) {
        return `Invalid vitamin color: ${color}!`;
    }

    static SAME_COLOR (size, color) {
        return `Trying to change vitamin #${size} color to its current color: ${color}. Can I ask why?`;
    }

    static EMPTY_GROUP (color) {
        return `-> Creating empty group for color ${color}.`;
    }

    static COLOR_CHANGE (size, color, targetColor) {
        return `-> Vitamin #${size} changed color from ${color} to ${targetColor}.`;
    }

    static COLOR_INITIAL (size, color) {
        return `-> Vitamin #${size} color was set to ${color}.`;
    }

    static WRONG_CURRENT_COLOR (size, color, stateColor) {
        return `The current color of vitamin #${size} is ${color}, not ${stateColor}?`;
    }

// Size error messages --------------------------------------------------------

    static INVALID_SIZE (size) {
        return `Invalid vitamin size: ${size}!`;
    }

    static UNDEFINED_VITAMIN (size) {
        return `Undefined vitamin with size ${size}!`;
    }

    static NOT_STARTING_FROM_INITIAL (size) {
        return `Vitamins not starting from ${size}!`;
    }

    static MISSING_VITAMIN (size) {
        return `Vitamin with size ${size} is missing!`;
    }

    static REPEATING_SIZE (size) {
        return `Repeating vitamins with size: ${size}!`
    }
}

module.exports = Texts;