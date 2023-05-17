export interface IReadlineProps {
	readonly placeholder: string;
	readonly label: string;
	onSubmit(value: string): void;
}
