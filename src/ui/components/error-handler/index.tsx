import React, { Component } from 'react';
import { Newline, Text } from 'ink';
import { ErrorBox } from '../error-box/index.js';
import { Config } from '../../../data/config/index.js';

type Props = {
	children: React.ReactNode;
};
const parseError = (error: unknown): Error => {
	if (error instanceof Error) {
		return error;
	}
	return new Error(String(error));
};
//
// Error Interfaces
// ----------------------------------------------------------------------
interface ErrorInfo {
	/**
	 * Captures which component contained the exception, and its ancestors.
	 */
	componentStack: string;
}

interface ErrorData {
	error: Error;
	errorInfo: ErrorInfo;
}

export class ErrorHandler extends Component<Props, ErrorData | {}> {
	private readonly verbose: boolean;
	constructor(props: Props) {
		super(props);
		this.state = {};

		this.verbose = Config.verbose.get();
	}

	/**
	 * Catches exceptions generated in descendant components. Unhandled exceptions will cause
	 * the entire component tree to unmount.
	 */
	override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.setState({ error: parseError(error), errorInfo });
	}

	override render() {
		if ('error' in this.state) {
			return (
				<>
					<ErrorBox>
						{'Error: '}
						{this.state.error.message}
					</ErrorBox>
					{this.verbose && <Newline />}
					{this.verbose && <Text>{this.state.errorInfo.componentStack}</Text>}
				</>
			);
		}
		return this.props.children as any;
	}
}

export const withErrorHandler = <P extends {}>(Component: React.FC<P>) => {
	const Container: React.FC<P> = (props) => {
		return (
			<ErrorHandler>
				<Component {...props} />
			</ErrorHandler>
		);
	};

	return Container;
};
