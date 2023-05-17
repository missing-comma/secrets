import React, { useMemo, useEffect } from 'react';

import useAllFlowsContext from '../context/index.js';

type Props = {
	readonly id: string;
	readonly children: React.ReactNode;
};

export default (props: Props) => {
	const ctx = useAllFlowsContext();
	const flowState = ctx.flows[props.id] ?? null;

	const Children = React.Children.toArray(props.children);

	useEffect(() => {
		ctx.create(props.id, Children.length);
	}, []);

	useEffect(() => {
		ctx.updateFlowProp(props.id, 'size', Children.length);
	}, [Children.length]);

	const Active = useMemo(() => {
		const flowStateStep = flowState?.step ?? 0;
		return Children.find((_, index) => index === flowStateStep);
	}, [props.children, props.id, flowState?.step]);

	if (Active) {
		return <>{Active}</>;
	}

	return <>{props.children}</>;
};
