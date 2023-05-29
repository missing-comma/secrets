import React from 'react';
import { IFormSelectorParsedProps as IProps } from '../../types.js';
import { InlineSelector } from './inline-selector.js';
import { TableSelector } from './table-selector.js';

export const Selector: React.FC<IProps<any>> = (props) => {
	if (props.inline) {
		return <InlineSelector {...props} />;
	}

	return <TableSelector {...props} />;
};
