export type Coordinates = {
	row: number;
	col: number;
};

export const makeGetCoordenatesFromIndex = (colCount: number) => {
	return (index: number): Coordinates => {
		const col = index % colCount;
		const row = Math.floor(index / colCount);
		return { col, row };
	};
};
