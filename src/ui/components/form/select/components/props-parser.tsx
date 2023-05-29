import React from 'react';
import {
	IFormSelectorParsedProps as IParsedProps,
	IFormSelectorComponent as FC,
} from '../types.js';
import { useParseSelectionProps } from '../hooks/use-parse-props/index.js';

export const withPropsParser = (Component: React.FC<IParsedProps<any>>) => {
	const FormSelectorContainer: FC = (props) => {
		const parsedProps = useParseSelectionProps(props);

		return <Component {...parsedProps} />;
	};

	return FormSelectorContainer;
};
