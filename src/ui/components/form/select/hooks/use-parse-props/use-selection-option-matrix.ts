import { useMemo } from 'react';
import { IFormSelectorOptions as IOption } from '../../types.js';
import { Matrix } from '../../../../../../data/matrix/index.js';

export const useSelectionMatrix = <V>(
	options: IOption<V>[],
	colCount: number,
): Matrix<IOption<V>> => {
	return useMemo((): Matrix<IOption<V>> => new Matrix(options, colCount), [options, colCount]);
};
