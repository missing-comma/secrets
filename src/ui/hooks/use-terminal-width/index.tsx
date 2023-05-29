import { useStdout } from 'ink';

export const useTerminalWidth = () => {
	return useStdout().stdout.columns;
};
