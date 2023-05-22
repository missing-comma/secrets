import React, { useRef } from 'react';

// import useAllFlowsContext from '../context/index.js';
// import { useMountRef } from '../../../hooks/use-mount-ref/index.js';

type Props = {
	readonly id: string;
	readonly children: React.ReactNode;
};

export default (props: Props) => {
	const renderCountRef = useRef<number>(0);
	renderCountRef.current++;

	// useEffect(() => {
	// 	if (mountRef.current) {
	// 		ctx.advance(props.id);
	// 	}
	// }, []);
	return <>{props.children}</>;
};
