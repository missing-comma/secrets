import { useRef } from 'react';

export const useMountRef = () => {
	const renderCountRef = useRef<number>(0);
	const mountRef = useRef<boolean>(false);

	mountRef.current = renderCountRef.current >= 1;
	renderCountRef.current++;

	return mountRef;
};
