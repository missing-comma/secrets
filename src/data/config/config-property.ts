import chalk from 'chalk';

const NOT_SET: any = Symbol('not-set');

export interface IConfigPropertyValues<K extends string, V = any> {
	readonly key: K;
	readonly defaultValue: V;
	readonly value?: K;
}

export type IConfigPropertyValidation<K extends string, V = any> = (
	value: V,
	defaultValue: V,
	key: K,
) => string | undefined;

export class PropertyValuesConfig<K extends string, V = any> {
	private value: any;
	public readonly defaultValue!: V;

	public readonly key!: K;
	public validates: IConfigPropertyValidation<K, V>[] = [];

	constructor(data: IConfigPropertyValues<K, V>, private readonly onSet: () => void) {
		Object.assign(this, data);
	}

	public get(): V {
		if (this.value !== undefined) {
			return this.value;
		}
		if (this.defaultValue === NOT_SET) {
			throw new Error(
				`ConfigProperty.${this.key} - value is required, but undefined received`,
			);
		}
		return this.defaultValue;
	}

	public set = (value: V) => {
		this.value = value;
		this.onSet();
		return this;
	};

	public withCheckChangedValue = (isEqual?: (a: V, b: V) => boolean) => {
		const equals = isEqual || ((a, b) => a === b);
		return this.withValidation((value, defaultValue) => {
			if (equals(value, defaultValue)) return;
			return `using ${chalk.magenta(value)}`;
		});
	};

	public withValidation = (validate: IConfigPropertyValidation<K, V>) => {
		this.validates.push(validate);
		return this;
	};
}

export class PropertyConfig<K extends string, V = any> {
	static NOT_SET: any = NOT_SET;
	private firstGet: boolean = true;

	public readonly meta: PropertyValuesConfig<K, V>;
	constructor(data: IConfigPropertyValues<K, V>) {
		this.meta = new PropertyValuesConfig(data, () => {
			this.firstGet = true;
		});
	}

	public get(): V {
		const value = this.meta.get();
		if (this.meta.validates.length) {
			if (this.firstGet) {
				this.firstGet = false;
				const {key, defaultValue} = this.meta;
				const actualDefaultValue = defaultValue === NOT_SET ? undefined : defaultValue;
				const msgms = this.meta.validates.map((validate) =>
					validate(value, actualDefaultValue as any, key),
				);
				msgms.forEach((message) => {
					if (message) {
						console.warn(
							chalk.yellow(`Config: ${`(${chalk.red(this.meta.key)})`} ${message}`),
						);
					}
				});
			}
		}
		return value;
	}

	public includes = (...values: V[]): boolean => {
		return values.includes(this.get());
	};
}
