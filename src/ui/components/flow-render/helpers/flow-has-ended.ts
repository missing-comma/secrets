import { IFlowRenderSingleState } from '../protocols.js';

export default ({ step, size }: IFlowRenderSingleState): boolean => {
	return step + 1 === size;
};
