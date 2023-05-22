import { useRef } from 'react';

export const useMemoRef = <V>(callback: () => V) => {
	const callbackRef = useRef<V>();
	callbackRef.current = callback();
	return callbackRef as React.MutableRefObject<V>;
};
