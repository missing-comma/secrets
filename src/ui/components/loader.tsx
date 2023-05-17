import { Text } from 'ink';
import React, { useState, useEffect } from 'react';

const MAX_STEPS = 3;
// const LOAD_KEYS = ['><', '<>', '><', '<>'];
const [FILL, VOID] = ['.', ' '];
// ['=', '-'];

export const Loader = () => {
	const [step, setStep] = useState<number>(0);

	const end = FILL.repeat(step) + VOID.repeat(MAX_STEPS - step);
	// const start = end.split('').reverse().join('');

	useEffect(() => {
		const interval = setInterval(() => {
			setStep((s) => (s + 1) % (MAX_STEPS + 1));
		}, 300);
		return () => clearInterval(interval);
	}, []);

	return <Text color="yellow">{`Loading${end}`}</Text>;
};
