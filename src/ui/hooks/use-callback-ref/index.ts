import { useRef } from 'react';

export const useCallbackRef = <A extends any[], R>(callback: (...args: A) => R) => {
	const callbackRef = useRef<(...args: A) => R>(callback);
	callbackRef.current = callback;

	return callbackRef;
};
