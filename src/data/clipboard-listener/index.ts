import events from 'events';
import clipboardy from 'clipboardy';

interface ClipboardListenerOptions {
	readonly timeInterval: number;
	readonly immediate: boolean;
}

type ClipboardEvent = 'change';
type ClipboardEventCallback = {
	change(...args: any): void;
};

export class ClipboardListener {
	private eventEmitter: events.EventEmitter;
	private readonly timeInterval: number;
	private readonly immediate: boolean;

	private interval: null | NodeJS.Timer;
	private lastValue: null | string;
	private init: boolean;
	private isWatching: boolean;

	/**
	 * Create an event emitter and start watching
	 * @constructor
	 * @param {Partial<ClipboardListenerOptions>} [options] - Custom options object (optional)
	 */
	constructor(options: Partial<ClipboardListenerOptions> = {}) {
		this.eventEmitter = new events.EventEmitter();
		this.timeInterval = options.timeInterval || 250;
		this.immediate = !!options.immediate; // False by default
		this.interval = null;
		this.lastValue = null;
		this.init = true;
		this.isWatching = false;
		this.watch();
	}

	/**
	 * Start watching for the clipboard changes
	 * @access private
	 */
	private watch = () => {
		if (!this.isWatching) {
			this.isWatching = true;
		}

		this.interval = setInterval(async () => {
			const value = await clipboardy.read();
			if (value !== this.lastValue) {
				this.lastValue = value;
				if (this.immediate || !this.init) {
					this.eventEmitter.emit('change', this.lastValue);
				}
				if (this.init) {
					this.init = false;
				}
			}
		}, this.timeInterval);
	};

	/**
	 * Listen to an event
	 * @param {ClipboardEvent} event - The event name
	 * @param {Function} listener - Event callback
	 */
	on = <E extends ClipboardEvent>(event: E, listener: ClipboardEventCallback[E]) => {
		this.eventEmitter.on(event, listener);
		return {
			off: () => this.off(event, listener),
		};
	};

	/**
	 * Stop listening to an event
	 * @param {ClipboardEvent} event - The event name
	 * @param {Function} listener - Event callback
	 */
	off = <E extends ClipboardEvent>(event: E, listener: ClipboardEventCallback[E]) => {
		return this.eventEmitter.off(event, listener);
	};

	/**
	 * Stop listening and watching
	 * @returns {void}
	 */
	stop = (): void => {
		this.isWatching = false;
		if (this.interval !== null) clearInterval(this.interval);
		this.eventEmitter.removeAllListeners();
	};
}

export declare namespace ClipboardListener {
	export type Options = ClipboardListenerOptions;
	export type Event = ClipboardEvent;
	export type EventCallback = ClipboardEventCallback;
}
