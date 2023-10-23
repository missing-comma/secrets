type State = {
	id: number;
	node: NodeJS.Timer | null;
	handler: any;
	state: 'running' | 'stopped';
};

class Cache {
	public last_id: number = 0;
	public readonly intervals: State[] = [];
	public debugActive: boolean = false;
}

class IntervalManager {
	private readonly cache: Cache = new Cache();

	add = (handler: any) => {
		const id = this.cache.last_id++;
		this.cache.intervals.push({ id, handler, node: null, state: 'stopped' });
		return id;
	};

	start = (id: number, ms: number) => {
		const interval = this.cache.intervals.find((i) => i.id === id);
		if (!interval) {
			throw new Error(`Unable to locate interval with id = [${id}]`);
		}
		interval.node = setInterval(interval.handler, ms);
		interval.state = 'running';
	};

	stop = (id: number) => {
		const interval = this.cache.intervals.find((i) => i.id === id);
		if (!interval) {
			throw new Error(`Unable to locate interval with id = [${id}]`);
		}
		if (interval.node !== null) {
			clearInterval(interval.node);
			interval.node = null;
			interval.state = 'stopped';
		}
	};

	debug = () => {
		if (this.cache.debugActive) return;
		this.cache.debugActive = true;
		setInterval(() => {
			const actives = this.cache.intervals.filter((i) => i.state === 'running');
			console.log(`Active intervals = ${actives.length} / ${this.cache.intervals.length}`);
		}, 100);
	};
}

export const intervalManager = new IntervalManager();
