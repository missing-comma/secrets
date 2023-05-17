import {
	IFlowRenderAllContext as IContext,
	IFlowRenderSingleState as IFlowState,
} from '../protocols.js';

export type DispatchContext = (state: IContext) => IContext | Partial<IContext>;
export type DispatchState = (state: IContext) => IFlowState;

export default (dispatch: DispatchState): DispatchContext => {
	return (state) => {
		const nextFlowState = dispatch(state);
		const out = {
			flows: { ...state.flows, [nextFlowState.id]: nextFlowState },
		};

		// console.log(`assing flow state`, out);

		return out;
	};
};
