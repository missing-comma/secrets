import { makeGetCoordenatesFromIndex, Coordinates } from './index-to-coord.js';

type Values<V> = ReadonlyArray<ReadonlyArray<V>>;
type WritableValues<V> = Array<Array<V>>;

type PointArgs =
	| [row: number, col: number]
	| [coordinates: Coordinates]
	| [point: { x: number; y: number }];

export class Matrix<V> {
	public readonly values: Values<V>;
	public readonly rows: number;

	constructor(private readonly items: V[], public readonly cols: number) {
		const getCoordinates = makeGetCoordenatesFromIndex(this.cols);
		this.values = this.items.reduce((matrix: WritableValues<V>, item: V, index: number) => {
			const coords = getCoordinates(index);
			if (coords.col === 0) {
				matrix.push([]);
			}
			const row = matrix[coords.row];
			if (!row) {
				throw new Error(`Matrix: Failed to determine number of columns`);
			}
			row.push(item);

			return matrix;
		}, []);
		this.rows = this.values.length;
	}

	get lastRowSize() {
		return this.values[this.values.length - 1]?.length ?? 0;
	}

	has = (...args: PointArgs): boolean => {
		const { row, col } = this.parsePointArgs(args);

		if (row < 0) return false;
		if (col < 0) return false;
		if (row > this.rows - 1) return false;
		if (col > this.cols - 1) return false;
		const rowValues = this.values[row];
		if (!rowValues) return false;
		return col <= rowValues.length - 1;
	};

	at = (...args: PointArgs): V => {
		const { row, col } = this.parsePointArgs(args);
		return this.values[row]![col]!;
	};

	getLastFromRow = (rowIndex: number): V | null => {
		const row = this.values[rowIndex];
		if (!row) return null;
		return row[row.length - 1]!;
	};

	getRowSize = (rowIndex: number): number => {
		return this.values[rowIndex]?.length ?? 0;
	};

	getLastFromCol = (colIndex: number): V | null => {
		const reverseValues = Array.from(this.values).reverse();
		const lastRowWithCol = reverseValues.findIndex((row) => {
			return colIndex <= row.length - 1;
		});
		if (lastRowWithCol < 0) return null;
		const lastFromCol = reverseValues[lastRowWithCol];
		if (!lastFromCol) return null;
		return lastFromCol[lastFromCol.length - 1]!;
	};

	private parsePointArgs = (args: PointArgs) => {
		if (args.length === 2) {
			const [row, col] = args;
			return { row, col };
		}
		const [pointOrAddress] = args;
		if ('x' in pointOrAddress) {
			const { x: row, y: col } = pointOrAddress;
			return { row, col };
		}
		return pointOrAddress;
	};
}
