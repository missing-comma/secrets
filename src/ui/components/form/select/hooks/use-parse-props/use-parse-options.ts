import { useMemo } from 'react';
import { IFormSelectorProps as IProps, IFormSelectorOptions as IOption } from '../../types.js';
import { SelectExtraction } from './use-extraction.js';

export const useParseOptions = <V>(props: IProps<V>, extract: SelectExtraction<V>) => {
	const options = useMemo((): IOption<V>[] => {
		return props.options.map((value, index): IOption<V> => {
			return {
				value,
				key: extract.key(value),
				label: extract.label(value),
				index,
			};
		});
	}, [props.options, extract.key, extract.label]);

	return options;
};
