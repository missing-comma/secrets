import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function checkIsRunningFromLocalDir() {
	const cwd = process.cwd();
	const commandLocation = resolve(join(__dirname, ...new Array(3).fill('..')));

	return cwd === commandLocation;
}

function checkIsSecretsEnvIsSet() {
	return process.env['SECRETS_ENV'] !== undefined;
}

export function isCommandSafeToRun(enabled: boolean) {
	if (!enabled) return true;

	const isRunningFromLocalDir = checkIsRunningFromLocalDir();

	if (!isRunningFromLocalDir) return true;

	const isSecretsEnvIsSet = checkIsSecretsEnvIsSet();

	return isSecretsEnvIsSet;
}
