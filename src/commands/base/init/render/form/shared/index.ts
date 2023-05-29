import { makeFocusedFlow } from '../../../../../../ui/components/flow-render/index.js';
import { create } from 'zustand';
import { IFormValues } from './domain.js';

export const FlowRender = makeFocusedFlow('init-form-flow');

export interface IFormStore {
	readonly values: IFormValues;
	set<K extends keyof IFormValues>(key: K, value: IFormValues[K]): void;
}

export const useInitFormStore = create<IFormStore>((set) => ({
	values: {} as any,
	complete: 0,
	set: <K extends keyof IFormValues>(key: K, value: IFormValues[K]) => {
		set((prev) => {
			const next: IFormStore['values'] = Object.assign({}, prev.values, { [key]: value });
			return {
				values: next,
			};
		});
	},
}));

export interface IInitFormFieldProps<K extends keyof IFormValues> {
	readonly value: IFormValues[K] | undefined;
}

export const useInitFieldForm = <K extends keyof IFormValues>(
	field: K,
	props: IInitFormFieldProps<K>,
) => {
	const store = useInitFormStore();
	const { advance } = FlowRender.useContext();

	return {
		value: store.values[field] ?? props.value,
		onChange: (value: IFormValues[K]) => {
			store.set(field, value);
			advance();
		},
	};
};
