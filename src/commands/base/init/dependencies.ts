import { makeDependencyLoader } from '../../../data/dependency-loader/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';

export default makeDependencyLoader(() => {
	const configFS = new ConfigFS();
	return {
		configFS,
	};
});
