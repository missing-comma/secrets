import {
	IFormSelectorParsedProps as IParsedProps,
	IFormSelectorProps as IProps,
} from '../../types.js';
import { useParseOptions } from './use-parse-options.js';
import { useSelectExtraction } from './use-extraction.js';
import { useColumnCount } from './use-column-count.js';
import { useSelectionMatrix } from './use-selection-option-matrix.js';
import { useSelectionState } from './use-selection-state.js';
import { useInnerSelected } from './use-inner-selected.js';

export const useParseSelectionProps = <V>(props: IProps<V>): IParsedProps<V> => {
	const extract = useSelectExtraction(props);
	const options = useParseOptions(props, extract);
	const columnCount = useColumnCount(options);
	const matrix = useSelectionMatrix(options, columnCount);
	const { onDone, state } = useSelectionState();
	const innerSelected = useInnerSelected(props, options, extract);

	return {
		state,
		matrix,
		selected: innerSelected.selected,
		onChangeSelected: innerSelected.onChange,
		commitChanges: () => {
			props.onChange(innerSelected.selected.value);
		},
		label: props.label,
		onDone,
	};
};
