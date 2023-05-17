import { create } from 'zustand';
import { IFlowRenderAllContext, IFlowRenderSingleState } from '../protocols.js';
import flowHasEnded from '../helpers/flow-has-ended.js';
import assignFlow from '../helpers/assign-flow.js';
import makeSetFlowProp from '../helpers/set-flow-prop.js';

const makeAbort = (prefix: string) => {
	return (message: string) => {
		throw new Error(`Flow-Render - ${prefix} ${message}`);
	};
};

export default create<IFlowRenderAllContext>((set) => ({
	flows: {},
	advance: (flow) => {
		const abort = makeAbort(`unable to advance flow [ ${flow} ]:`);
		set(
			assignFlow((state) => {
				const flowState = state.flows[flow];
				if (!flowState) {
					throw abort('unknown flow');
				}
				if (flowHasEnded(flowState)) {
					throw abort('flow has already ended');
				}
				const nextFlowState: IFlowRenderSingleState = {
					...flowState,
					step: flowState.step + 1,
				};
				return nextFlowState;
			}),
		);
	},
	create: (flowId: string, size: number) => {
		const abort = makeAbort(`unable to create flow [ ${flowId} ]:`);
		set((state) => {
			if (state.flows[flowId]) {
				throw abort('already exists');
			}
			return assignFlow(() => ({ id: flowId, size, step: 0 }))(state);
		});
	},
	updateFlowProp: <P extends keyof IFlowRenderSingleState>(
		flow: string,
		prop: P,
		value: IFlowRenderSingleState[P],
	): void => {
		const abort = makeAbort(`for [ ${flow} ], unable to assign ${prop}:`);
		const setFlowProp = makeSetFlowProp({ abort });
		set(setFlowProp(flow, prop, value));
	},
}));
