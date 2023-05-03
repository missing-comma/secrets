export type Handler<
	Event extends string,
	Listener extends (...args: any) => any,
> = {
	on(event: Event, listener: Listener): any;
	off(event: Event, listener: Listener): any;
};

export class EventObserver<
	Event extends string,
	Listener extends (...args: any) => any,
> {
	constructor(
		private readonly handler: Handler<string, any>,
		private readonly event: Event,
		private readonly listener: Listener,
	) {}

	on = () => {
		this.handler.on(this.event, this.listener);
		return this;
	};

	off = () => {
		this.handler.off(this.event, this.listener);
		return this;
	};
}

export class EventManager<H extends Handler<string, any>> {
	constructor(private readonly handler: H) {}

	createObserver = <
		Event extends string,
		Listener extends (...args: any) => any,
	>(
		event: Event,
		listener: Listener,
	) => {
		return new EventObserver(this.handler, event, listener);
	};

	on = <Event extends string, Listener extends (...args: any) => any>(
		event: Event,
		listener: Listener,
	) => {
		const observer = this.createObserver(event, listener);
		return observer.on();
	};
}
