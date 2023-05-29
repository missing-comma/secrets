import React, { useEffect } from 'react';
import { withPropsParser } from './components/props-parser.js';
import { Selector } from './components/selector/index.js';
import { SelectorLabel } from './components/label.js';
import { Persisted } from '../../persisted/index.js';
import makeOption, { IInputOption } from './helpers/make-option.js';
import { IFormSelectorProps } from './types.js';

import { Box } from 'ink';

const FormSelectComponent = withPropsParser((props) => {
	useEffect(() => {
		if (props.state === 'done') {
			props.commitChanges();
		}
	}, [props.state]);

	if (props.state === 'selecting') {
		return (
			<Box flexDirection={props.inline ? 'row' : 'column'}>
				<SelectorLabel
					label={props.label}
					selected={props.selected}
					inline={props.inline}
				/>
				<Selector {...props} />
			</Box>
		);
	}

	return (
		<Persisted id={props.label + 1}>
			<SelectorLabel label={props.label} selected={props.selected} inline={false} />
		</Persisted>
	);
});

export const FormSelect = Object.assign(FormSelectComponent, {
	option: makeOption(),
	makeOption,
});

export declare namespace FormSelect {
	export type InputOption<V = unknown> = IInputOption<V>;
	export type Props<V = unknown> = IFormSelectorProps<V>;
}
