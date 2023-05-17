import React from 'react';
import { TextBox } from '../../../ui/components/text-box/index.js';

export const ErrorBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <TextBox color={'red'}>{children}</TextBox>;
};
