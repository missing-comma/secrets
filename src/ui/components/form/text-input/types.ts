export interface IReadlineProps {
	readonly default: string;
	readonly label: string;
	readonly sensitive?: boolean;
	onSubmit(value: string): void;
}
