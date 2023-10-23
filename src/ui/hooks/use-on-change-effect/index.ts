import { useState } from 'react';
import { useCallbackRef } from '../use-callback-ref/index.js';
import { useIntervalRef } from '../use-interval-ref/index.js';

export interface IUseOnChangeEffectHandleActions {
	stop(): void;
}

export interface IUseOnChangeEffectOptions<V> {
	readonly refreshRate: number;
	readonly getValue: () => V;
	onChange(value: V, prev: V): void;
}

export interface IUseOnChangeEffect extends IUseOnChangeEffectHandleActions {
	start(): void;
	trigger(): void;
}

export const useOnChangeEffect = <V>(options: IUseOnChangeEffectOptions<V>) => {
	const [value, setValue] = useState<V>(options.getValue);

	const onChangeRef = useCallbackRef(options.onChange);

	const interval = useIntervalRef({
		interval: options.refreshRate,
		initial: () => null,
		handle: () => {
			const next = options.getValue();
			setValue((prev) => {
				if (prev !== next) {
					onChangeRef.current(next, prev);
				}
				return next;
			});
		},
	});

	return [value, interval];
};
