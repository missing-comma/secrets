import React, { useEffect } from 'react';
import { withPropsParser } from './components/props-parser.js';
import { Selector } from './components/selector/index.js';
import { SelectorLabel } from './components/label.js';
import { Persisted } from '../../persisted/index.js';

export const FormSelect = withPropsParser((props) => {
	useEffect(() => {
		if (props.state === 'done') {
			props.commitChanges();
		}
	}, [props.state]);

	if (props.state === 'selecting') {
		return (
			<>
				<SelectorLabel label={props.label} selected={props.selected} />
				<Selector {...props} />
			</>
		);
	}

	return (
		<Persisted id={props.label + 1}>
			<SelectorLabel label={props.label} selected={props.selected} />
		</Persisted>
	);
});
