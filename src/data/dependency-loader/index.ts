class DependencyLoader<T> {
	private data: T = null as any;
	constructor(private readonly factory: () => T) {}

	load = () => {
		if (this.data === null) {
			this.data = this.factory();
		}
	};

	get = <K extends keyof T>(key: K): T[K] => {
		if (this.data === null) {
			throw new Error(`DependencyLoader: load not called`);
		}
		if (this.data === undefined) {
			throw new Error(`DependencyLoader: factory returned undefined`);
		}
		return this.data[key];
	};
}

export function makeDependencyLoader<T>(
	factory: () => T,
): T & {load: () => void} {
	const loader = new DependencyLoader(factory);

	return new Proxy(loader as any, {
		get(...args) {
			const [_, key] = args;
			if (typeof key === 'string' && key !== 'load') {
				return loader.get(key as any);
			}
			return Reflect.get(...args);
		},
	});
}
