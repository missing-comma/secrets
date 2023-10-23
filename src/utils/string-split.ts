export const stringSplit = (str: string, index: number) => {
	const before = str.slice(0, index);
	const after = str.slice(index);
	return [before, after] as const;
};
