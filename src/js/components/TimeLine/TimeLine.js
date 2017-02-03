'use strict';

const Tween = require('gsap');
const Texts = require('../../texts/Texts.js');

/**
 * TimeLine class
 * @class
 */
class TimeLine {

    /**
     * @static
     * @type {Tween}
     */
    static queue = new TimelineLite();

    /**
     * @static
     * @type {number}
     */
    static speed = 0.8;

    /**
     * @static
     * @type {number}
     */
    static delay = 1.5;

    /**
     * @static
     * @type {number}
     */
    static initialDelay = 0;

    /**
     * Resume the animation
     * @static
     */
    static resume () {
        if (! this.queue.paused()) return console.warn(Texts.ANIMATION_NOT_PAUSED);

        this.queue.resume();
        console.log(Texts.ANIMATION_RESUMED);
    }

    /**
     * Pause the animation timeline
     * @static
     */
    static pause () {
        if (this.queue.paused()) return console.warn(Texts.ANIMATION_PAUSED);

        this.queue.pause();
        console.log(Texts.ANIMATION_PAUSED);
    }

    /**
     * Restart the animation timeline
     * @static
     */
    static restart () {
        this.queue.restart();
        console.log(Texts.ANIMATION_RESTARTED);
    }

    /**
     * Clear the current queue and unbind all events
     * @static
     */
    static clear () {
        let events = ['onStart', 'onComplete'];
        events.forEach(event => this.queue.eventCallback(event, null));
        this.queue.clear();
        console.log(Texts.ANIMATION_TIMELINE_CLEARED);
    }
}

module.exports = TimeLine;