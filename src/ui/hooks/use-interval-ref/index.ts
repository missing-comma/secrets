import { useEffect, useRef, useCallback } from 'react';
import { useCallbackRef } from '../use-callback-ref/index.js';
import { useMemoRef } from '../use-memo-ref/index.js';

export interface IUseIntervalRefHandleActions {
	stop(): void;
}

export interface IUseIntervalRefOptions {
	readonly interval: number;
	readonly handle: (actions: IUseIntervalRefHandleActions) => void;
}

export interface IUseIntervalRef extends IUseIntervalRefHandleActions {
	start(): void;
	trigger(): void;
}

export const useIntervalRef = (options: IUseIntervalRefOptions): IUseIntervalRef => {
	const interval = useRef<NodeJS.Timer | null>();
	const intervalTime = useMemoRef(() => options.interval);
	const callback = useCallbackRef(options.handle);

	const stop = useCallback(() => {
		if (interval.current !== null) {
			clearInterval(interval.current);
			interval.current = null;
		}
	}, []);

	const trigger = useCallback(() => {
		const actions: IUseIntervalRefHandleActions = {
			stop,
		};
		callback.current(actions);
	}, []);

	const start = useCallback(() => {
		stop();
		interval.current = setInterval(trigger, intervalTime.current);
	}, []);

	useEffect(() => {
		start();
		return () => {
			stop();
		};
	}, []);

	return {
		start,
		stop,
		trigger,
	};
};
