import React from 'react';
import { TextInput } from '../../../../../../../ui/components/form/text-input/index.js';
import { IInitFormFieldProps, useInitFieldForm } from '../../shared/index.js';

export default (props: IInitFormFieldProps<'password'>) => {
	const { onChange } = useInitFieldForm('password', props);

	return (
		<TextInput
			label={'Write the password for your keys'}
			doneLabel=""
			default={''}
			onSet={onChange}
			sensitive
		/>
	);
};
