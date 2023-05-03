import React, {useEffect} from 'react';
import Deps from './dependencies.js';
import {WithSecret} from '../../../ui/components/with-secret/index.js';
import {TextBox} from '../../../ui/components/text-box/index.js';
import {WaitForAuthentication} from '../../../ui/components/with-authentication/index.js';

type Props = {
	name: string;
	description: string | null;
};

export default function PrivateCreateCommand({name: key, description}: Props) {
	const {checkExists, checkHash, create} = Deps;

	useEffect(() => {
		const keyAlreadyExists = checkExists.handle(key);
		if (keyAlreadyExists) {
			throw new Error(`secret for key [ ${key} ] already exists`);
		}
	}, []);

	return (
		<WaitForAuthentication validateHash={checkHash.handle}>
			{({password}) => {
				return (
					<WithSecret>
						{({secret}) => {
							useEffect(() => {
								create.handle(key, password, {description, value: secret});
							}, []);
							return (
								<>
									<TextBox color="green">{'Secret saved successfully'}</TextBox>
								</>
							);
						}}
					</WithSecret>
				);
			}}
		</WaitForAuthentication>
	);
}
