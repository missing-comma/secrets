import { useMemo } from 'react';
import useAllFlowsContext from '../context/index.js';
import { IFlowRenderSingleState } from '../protocols.js';

export const useFlowContext = (id: string) => {
	const ctx = useAllFlowsContext();
	const flow = useMemo(() => ctx.flows[id]!, []);

	return useMemo(() => {
		return {
			flowId: id,
			flow,
			advance: () => ctx.advance(id),
			updateFlowProp: <P extends keyof IFlowRenderSingleState>(
				prop: P,
				value: IFlowRenderSingleState[P],
			): void => {
				ctx.updateFlowProp(id, prop, value);
			},
		};
	}, [id, flow, ctx.advance, ctx.updateFlowProp]);
};
