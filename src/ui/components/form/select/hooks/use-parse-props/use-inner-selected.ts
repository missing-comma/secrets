import { useState, useEffect } from 'react';
import { IFormSelectorProps as IProps, IFormSelectorOptions as IOption } from '../../types.js';
import { SelectExtraction } from './use-extraction.js';
import { useCallbackRef } from '../../../../../hooks/use-callback-ref/index.js';

const makeParseRawSelected =
	<V>(options: IOption<V>[], extract: SelectExtraction<V>) =>
	(value: V | null): IOption<V> => {
		if (value === null) {
			return options[0]!;
		}
		const selectedKey = extract.key(value);
		return options.find((option) => option.key === selectedKey) || options[0]!;
	};

export const useInnerSelected = <V>(
	props: IProps<V>,
	options: IOption<V>[],
	extract: SelectExtraction<V>,
) => {
	const parseRawSelected = useCallbackRef(makeParseRawSelected(options, extract));

	const [selected, setSelected] = useState<IOption<V>>(() => {
		return parseRawSelected.current(props.selected);
	});

	useEffect(() => {
		setSelected(parseRawSelected.current(props.selected));
	}, [props.selected]);

	return {
		selected,
		onChange: setSelected,
	};
};
