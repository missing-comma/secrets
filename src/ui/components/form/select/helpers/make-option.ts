export interface IInputOption<V> {
	readonly value: V;
	readonly label: string;
	readonly key: string;
}

export default <V = unknown>() =>
	<X extends V>(option: { value: X; label: string; key?: string }): IInputOption<X> => {
		return {
			key: option.label,
			...option,
		};
	};
