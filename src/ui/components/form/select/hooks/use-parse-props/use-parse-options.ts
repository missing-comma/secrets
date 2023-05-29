import { useMemo } from 'react';
import {
	IFormSelectorProps as IProps,
	IFormSelectorOptions as IOption,
	IFormSelectorOptionsLabel as IOptionLabel,
} from '../../types.js';
import { SelectExtraction } from './use-extraction.js';
import { ASCIIHandler } from '../../../../../../data/ascii-handler/index.js';

type PartialLabelOption<V> = Omit<IOption<V>, 'label'> & {
	readonly label: Omit<IOptionLabel, 'placeholder'>;
};

export const useParseOptions = <V>(props: IProps<V>, extract: SelectExtraction<V>) => {
	const options = useMemo((): IOption<V>[] => {
		const base = props.options.map((value, index): PartialLabelOption<V> => {
			const label = extract.label(value);

			return {
				value,
				key: extract.key(value),
				label: {
					value: label,
					size: ASCIIHandler.strip(label).length,
				},
				index,
			};
		});
		const maxSize = base.reduce((max, { label }) => Math.max(max, label.size), 0);

		const placeholder = ({ label: { value, size } }: PartialLabelOption<V>) => {
			const padding = ' '.repeat(maxSize - size);
			return value + padding;
		};

		return base.map(
			(option): IOption<V> => ({
				...option,
				label: { ...option.label, placeholder: placeholder(option) },
			}),
		);
	}, [props.options, extract.key, extract.label]);

	return options;
};
