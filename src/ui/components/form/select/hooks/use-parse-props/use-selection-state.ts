import { useCallback, useState } from 'react';
import { IFormSelectorState as IState } from '../../types.js';

export const useSelectionState = () => {
	const [state, setState] = useState<IState>('selecting');

	return {
		state,
		onDone: useCallback(() => setState('done'), []),
	};
};
