import { useCallback } from 'react';
import { IFormSelectorProps as Props } from '../../types.js';

type Extractor<V> = (value: V) => string;

export type SelectExtraction<V> = {
	key: Extractor<V>;
	label: Extractor<V>;
};

const extractWithAnyOf = (...extractors: Array<undefined | Extractor<any>>) => {
	const extractor = extractors.find(Boolean);
	if (!extractor) return (value: any): string => String(value);
	return extractor;
};

export const useSelectExtraction = <V>(props: Props<V>): SelectExtraction<V> => {
	const extract = {
		key: useCallback(extractWithAnyOf(props.extractKey, props.extractLabel), [
			props.extractKey || props.extractLabel,
		]),
		label: useCallback(extractWithAnyOf(props.extractLabel, props.extractKey), [
			props.extractKey || props.extractLabel,
		]),
	};

	return extract;
};
