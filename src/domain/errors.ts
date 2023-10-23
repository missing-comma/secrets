export class DetailedError extends Error {
	constructor(public readonly title: string, public readonly description?: string) {
		super(title);
		this.name = this.constructor.name;
	}
}
