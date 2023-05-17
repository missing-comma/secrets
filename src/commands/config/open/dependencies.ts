import { makeDependencyLoader } from '../../../data/dependency-loader/index.js';
import { ConfigFS } from '../../../data/file-system/index.js';
import { ConfigOpen } from '../../../services/config/open/index.js';

export default makeDependencyLoader(() => {
	const configFS = new ConfigFS();
	return {
		config: {
			open: new ConfigOpen(configFS),
		},
	};
});
