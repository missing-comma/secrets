import { PropertyConfig } from './config-property.js';

export class PropertyFactoryConfig<K extends string = string, V = any> {
	private _key!: any;
	private _defaultValue!: any;
	private _value!: any;

	key = <Key extends string>(key: Key): PropertyFactoryConfig<Key, V> => {
		this._key = key;
		return this as any;
	};

	default = (accessor: V | (() => V)): PropertyFactoryConfig<K, V> => {
		if (typeof accessor === 'function') {
			this._defaultValue = (accessor as any)();
		} else {
			this._defaultValue = accessor;
		}
		return this as any;
	};

	value = (accessor: V | undefined | (() => V | undefined)): PropertyFactoryConfig<K, V> => {
		return this.anyValue(accessor);
	};

	anyValue = (accessor: any | (() => any)): PropertyFactoryConfig<K, V> => {
		if (typeof accessor === 'function') {
			this._value = (accessor as any)();
		} else {
			this._value = accessor;
		}
		return this as any;
	};

	nullable = (): PropertyFactoryConfig<K, V | null> => {
		return this.default(null as any) as any;
	};

	make = (): PropertyConfig<K, V> => {
		if (this._key === undefined)
			throw new Error(`ConfigPropertyFactory.make - key cant be undefined`);
		if (this._defaultValue === undefined)
			throw new Error(
				`ConfigPropertyFactory.make - [${this._key}].defaultValue cant be undefined`,
			);
		const prop = new PropertyConfig({
			key: this._key,
			defaultValue: this._defaultValue,
			value: this._value,
		});
		if (this._defaultValue !== PropertyConfig.NOT_SET) {
			prop.meta.withCheckChangedValue();
		}
		return prop;
	};
}

export const configPropertyFactory = <Value>(): PropertyFactoryConfig<string, Value> => {
	return new PropertyFactoryConfig().default(PropertyConfig.NOT_SET) as any;
};

export const configFactory = <F extends Record<string, PropertyFactoryConfig>>(factories: F) => {
	type Value<CPF> = CPF extends PropertyFactoryConfig<any, infer V> ? V : never;
	type Config = { [K in keyof F]: PropertyConfig<Extract<K, string>, Value<F[K]>> };

	const out: Record<string, PropertyConfig<any, any>> = {};
	Object.entries(factories).forEach(([key, propertyFactory]) => {
		out[key] = propertyFactory.key(key).make();
	});
	return out as Config;
};
