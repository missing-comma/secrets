import {useCallback, useState} from 'react';

export interface IMutationState<R> {
	isLoading: boolean;
	result: R | undefined;
	error: string | null;
}

export const useMutation = <A extends any[], R>(
	callback: (...args: A) => Promise<R>,
) => {
	const [state, setState] = useState<IMutationState<R>>({
		isLoading: false,
		result: undefined,
		error: null,
	});

	const setLoading = (loading: boolean) =>
		setState(s => ({...s, isLoading: loading}));

	const mutate = useCallback(async (...args: A) => {
		setLoading(true);
		try {
			const result = await callback(...args);
			setState({
				isLoading: false,
				error: null,
				result,
			});
		} catch (err) {
			setState({
				isLoading: false,
				error: String(err),
				result: undefined,
			});
		}
	}, []);

	return {
		...state,
		mutate,
	};
};
