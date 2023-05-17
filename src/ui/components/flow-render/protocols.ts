export interface IFlowRenderAllContext {
	readonly flows: Record<string, IFlowRenderSingleState>;
	advance(flow: string): void;
	create(flow: string, size: number): void;
	updateFlowProp<P extends keyof IFlowRenderSingleState>(
		flow: string,
		prop: P,
		value: IFlowRenderSingleState[P],
	): void;
}

export interface IFlowRenderSingleState {
	/**
	 * Id of the flow
	 */
	readonly id: string;

	/**
	 * Current step in the flow
	 */
	readonly step: number;

	/**
	 * Size of the flow
	 */
	readonly size: number;
}
