import React, { useCallback, useEffect, useState } from 'react';
import { Text, useInput } from 'ink';
import { useIntervalRef } from '../../hooks/use-interval-ref/index.js';

type Props = {
	timeout?: number;
};

export const WaitForAnyInput: React.FC<Props> = ({ timeout = 3 }) => {
	const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
	const [done, setDone] = useState<boolean>(false);
	const onDone = useCallback(() => setDone(true), []);

	const interval = useIntervalRef({
		interval: 100,
		initial: () => ({ start: new Date().getTime() }),
		handle: ({ initial: { start } }) => {
			const now = new Date().getTime();
			const delta = (now - start) / 1000;
			const next = Math.floor(delta);
			if (next > timeout) {
				onDone();
			}
			setElapsedSeconds(next);
		},
		lazy: true,
	});

	const remainingSeconds = timeout - elapsedSeconds;

	useInput(onDone, { isActive: !done });

	useEffect(() => {
		if (timeout < 0) return;
		interval.start();
	}, []);

	useEffect(() => {
		if (done) interval.stop();
	}, [done]);

	if (!done) {
		return (
			<>
				<Text>Press any key to continue. Or wait {remainingSeconds} seconds.</Text>
			</>
		);
	}
	return null;
};
