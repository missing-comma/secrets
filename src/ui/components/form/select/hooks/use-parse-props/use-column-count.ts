import { useMemo } from 'react';
import { IFormSelectorOptions as IOption } from '../../types.js';
import { useTerminalWidth } from '../../../../../hooks/use-terminal-width/index.js';

export const useColumnCount = <V>(options: IOption<V>[]): number => {
	const terminalWidth = useTerminalWidth();

	const maxSize = useMemo(() => {
		const value = options.reduce((max, option) => Math.max(max, option.label.length), 0);
		if (value % 2 === 0) return value;
		return value - 1;
	}, [options]);

	const colCount = Math.floor(terminalWidth / (maxSize + 8));

	return colCount;
};
