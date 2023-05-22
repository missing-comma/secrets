import { useMemo } from 'react';
import { IFormSelectorParsedProps as IParsedProps } from '../types.js';
import {
	Coordinates,
	makeGetCoordenatesFromIndex,
} from '../../../../../data/matrix/index-to-coord.js';

export const useSelectedCoordinates = <V>(props: IParsedProps<V>) => {
	const { matrix, selected, onChangeSelected } = props;

	const selectedCoordinates = useMemo(
		() => makeGetCoordenatesFromIndex(matrix.cols)(selected.index),
		[selected, matrix.cols],
	);

	const go = useMemo(() => {
		const isLastRow = matrix.rows - 1 <= selectedCoordinates.row;
		const isFirstRow = selectedCoordinates.row === 0;

		const applyOffset = (offset: Coordinates) => {
			return {
				row: selectedCoordinates.row + offset.row,
				col: selectedCoordinates.col + offset.col,
			};
		};

		const onChangeCoordinates = (next: Coordinates): boolean => {
			if (matrix.has(next)) {
				onChangeSelected(matrix.at(next));
				return true;
			}
			return false;
		};

		const goToLastOfRow = (row: number): boolean => {
			const lastFromRow = matrix.getLastFromRow(row);
			if (!lastFromRow) return false;
			onChangeSelected(lastFromRow);
			return true;
		};

		const goToLastOfCol = (col: number): boolean => {
			return (
				onChangeCoordinates({ row: matrix.rows - 1, col }) ||
				onChangeCoordinates({ row: matrix.rows - 2, col })
			);
		};

		const current = selectedCoordinates;
		return {
			left: () => {
				const next = applyOffset({ row: 0, col: -1 });
				if (onChangeCoordinates(next)) return;
				goToLastOfRow(current.row);
			},
			right: () => {
				const next = applyOffset({ row: 0, col: 1 });
				if (next && onChangeCoordinates(next)) return;
				if (isLastRow) {
					goToLastOfRow(current.row - 1);
				} else {
					onChangeCoordinates({ row: current.row, col: 0 });
				}
			},
			up: () => {
				const next = applyOffset({ row: -1, col: 0 });
				if (next && onChangeCoordinates(next)) return;
				if (!isFirstRow) return;
				goToLastOfCol(current.col);
			},
			down: () => {
				const next = applyOffset({ row: 1, col: 0 });
				if (next && onChangeCoordinates(next)) return;

				if (isLastRow) {
					onChangeCoordinates({ row: 0, col: current.col });
				} else {
					goToLastOfRow(current.row + 1);
				}
			},
		};
	}, [selectedCoordinates]);

	return {
		coordinates: selectedCoordinates,
		go,
	};
};

export type SelectedCoordinates = ReturnType<typeof useSelectedCoordinates>;
