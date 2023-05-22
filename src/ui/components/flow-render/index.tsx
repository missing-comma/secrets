import makeWithDefaultId from './helpers/with-default-id.js';
import Container from './components/container.js';
import RenderOnce from './components/render-once.js';
import { useFlowContext } from './hooks/use-flow-context.js';

export const makeFocusedFlow = (id: string) => {
	const withDefaultId = makeWithDefaultId(id);
	return {
		Container: withDefaultId(Container),
		RenderOnce: withDefaultId(RenderOnce),
		useContext: () => useFlowContext(id),
	};
};

export const FlowRender = Object.assign(Container, {
	RenderOnce,
	useContext: useFlowContext,
	focus: makeFocusedFlow,
});
