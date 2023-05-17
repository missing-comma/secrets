import { Static } from 'ink';
import React, { useMemo } from 'react';

export const Persisted: React.FC<{ children: React.ReactNode; id?: string }> = (props) => {
	const id = useMemo(() => {
		return props.id ?? String(Math.random());
	}, [props.id]);

	return (
		<Static items={[id]}>
			{() => {
				return <React.Fragment key={id}>{props.children}</React.Fragment>;
			}}
		</Static>
	);
};
