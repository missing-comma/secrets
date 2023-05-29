import { useMemo } from 'react';
import { IFormSelectorOptions as IOption } from '../../types.js';
import { useTerminalWidth } from '../../../../../hooks/use-terminal-width/index.js';

export const useColumnCount = <V>(
	options: IOption<V>[],
	inline: boolean,
	cols: number | undefined,
): number => {
	const terminalWidth = useTerminalWidth();

	const maxSize = useMemo(() => {
		const value = options.reduce((max, option) => Math.max(max, option.label.size), 0);
		if (value % 2 === 0) return value;
		return value;
	}, [options]);

	const colCount = Math.floor(terminalWidth / (maxSize + 8));

	if (inline) return options.length;
	if (cols !== undefined) return cols;

	return colCount;
};
