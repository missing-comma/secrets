import { IFlowRenderSingleState as IFlowState } from '../protocols.js';
import assignFlow, { DispatchContext } from './assign-flow.js';

export type SetFlowProp = <P extends keyof IFlowState>(
	flowId: string,
	prop: P,
	value: IFlowState[P],
) => DispatchContext;

type Payload = {
	abort(reason: string): never;
};

export default ({ abort }: Payload): SetFlowProp => {
	return <P extends keyof IFlowState>(flowId: string, prop: P, value: IFlowState[P]) => {
		const dispatch: DispatchContext = (state) => {
			const prevFlowState = state.flows[flowId];
			if (!prevFlowState) {
				throw abort('unknown flow');
			}
			const nextFlowState = { [prop]: value } as { [K in P]: IFlowState[P] };
			return assignFlow(() => ({ ...prevFlowState, ...nextFlowState }))(state);
		};

		return dispatch;
	};
};
