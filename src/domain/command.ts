export interface ICommand<Data> {
	name: string;
	render(data: Data): any;
}
