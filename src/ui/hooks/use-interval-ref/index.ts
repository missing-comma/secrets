import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useCallbackRef } from '../use-callback-ref/index.js';
import { useMemoRef } from '../use-memo-ref/index.js';

export interface IUseIntervalRefHandleActions<Initial> {
	initial: Initial;
	stop(): void;
}

export interface IUseIntervalRefOptions<Initial> {
	readonly interval: number;
	readonly handle: (actions: IUseIntervalRefHandleActions<Initial>) => void;
	readonly initial: () => Initial;
	readonly lazy?: boolean;
}

export interface IUseIntervalRef<Initial> extends IUseIntervalRefHandleActions<Initial> {
	start(): void;
	trigger(): void;
}

export const useIntervalRef = <Initial>(
	options: IUseIntervalRefOptions<Initial>,
): IUseIntervalRef<Initial> => {
	const interval = useRef<NodeJS.Timer | null>();
	const intervalTime = useMemoRef(() => options.interval);
	const callback = useCallbackRef(options.handle);
	const initial = useMemo(() => options.initial(), []);

	const stop = useCallback(() => {
		if (interval.current !== null) {
			clearInterval(interval.current);
			interval.current = null;
		}
	}, []);

	const trigger = useCallback(() => {
		const actions: IUseIntervalRefHandleActions<Initial> = {
			stop,
			initial,
		};
		callback.current(actions);
	}, []);

	const start = useCallback(() => {
		stop();
		interval.current = setInterval(trigger, intervalTime.current);
	}, []);

	useEffect(() => {
		if (!options.lazy) {
			start();
		}
		return () => {
			stop();
		};
	}, []);

	return {
		initial,
		start,
		stop,
		trigger,
	};
};
