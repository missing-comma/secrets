declare module 'ink-spinner' {
	/// <reference types="react" />
	import type { SpinnerName } from 'cli-spinners';
	type LikedSpinnerTypes =
		| 'dots'
		| 'dots2'
		| 'dots12'
		| 'line'
		| 'binary'
		| 'triangle'
		| 'bouncingBar'
		| 'bouncingBall'
		| 'pong'
		| 'point'
		| 'aesthetic';
	type Props = {
		/**
		 * Type of a spinner.
		 * See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.
		 *
		 * @default dots
		 */
		type?: Extract<SpinnerName, LikedSpinnerTypes>;
	};
	/**
	 * Spinner.
	 */
	declare function Spinner({ type }: Props): JSX.Element;
	export default Spinner;
}
