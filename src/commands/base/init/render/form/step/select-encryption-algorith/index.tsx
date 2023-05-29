import React from 'react';
import { IInitFormFieldProps, useInitFieldForm } from '../../shared/index.js';
import { FormSelect } from '../../../../../../../ui/components/form/select/index.js';
import { SUPPORTED_HASH_ALGORITHMS } from '../../../../../../../domain/hash-algorith.js';

export default (props: IInitFormFieldProps<'hashingAlgorithm'>) => {
	const { value, onChange } = useInitFieldForm('hashingAlgorithm', props);

	return (
		<FormSelect
			selected={value}
			label={'Select the encryption algorithm'}
			options={SUPPORTED_HASH_ALGORITHMS}
			onChange={onChange}
		/>
	);
};
