export const withPerformanceMeasurement = <A extends any[], R>(
	callback: (...args: A) => Promise<R>,
	fnName?: string,
) => {
	const name = callback.name || fnName || 'anonymous';
	return {
		[name]: (...args: A): Promise<R> => {
			const start = performance.now();
			return callback(...args).finally(() => {
				const delta = performance.now() - start;

				console.log(`performance: [${name}] took ${delta}ms`);
			});
		},
	}[name]!;
};
