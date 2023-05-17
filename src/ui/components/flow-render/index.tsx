import makeWithDefaultId from './helpers/with-default-id.js';
import Container from './components/container.js';
import { useFlowContext } from './hooks/use-flow-context.js';

export const makeFocusedFlow = (id: string) => {
	const withDefaultId = makeWithDefaultId(id);
	return {
		Container: withDefaultId(Container),
		useContext: () => useFlowContext(id),
	};
};

export const FlowRender = Object.assign(Container, {
	useContext: useFlowContext,
	focus: makeFocusedFlow,
});
