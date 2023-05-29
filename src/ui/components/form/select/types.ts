import { Matrix } from '../../../../data/matrix/index.js';

export interface IFormSelectorProps<V> {
	readonly label: string;
	readonly selected: V | null;
	readonly options: readonly V[];
	onChange(selected: V): void;
	extractKey?(value: V): string;
	extractLabel?(value: V): string;
}

export type IFormSelectorState = 'selecting' | 'done';

export interface IFormSelectorOptions<V> {
	readonly value: V;
	readonly label: string;
	readonly key: string;
	readonly index: number;
}

export interface IFormSelectorSelection<V> {
	value: IFormSelectorOptions<V>;
	onChangeSelected(selected: IFormSelectorOptions<V>): void;
	commitChanges(): void;
}

export interface IFormSelectorParsedProps<V> {
	readonly state: IFormSelectorState;
	readonly label: string;
	readonly matrix: Matrix<IFormSelectorOptions<V>>;
	readonly selected: IFormSelectorOptions<V>;
	onChangeSelected(selected: IFormSelectorOptions<V>): void;
	/**
	 * Should commit selection and propagate changes to parent component
	 */
	commitChanges(): void;
	/**
	 * Indicates that the user is done selecting
	 */
	onDone(): void;
}

export type IFormSelectorComponent = {
	<V>(props: IFormSelectorProps<V>): React.ReactElement<any, any> | null;
	defaultProps?: IFormSelectorProps<unknown>;
};
