import React from 'react';

export default (id: string) =>
	<P extends { readonly id: string }>(Component: React.FC<P>) => {
		const WithDefaultId: React.FC<Omit<P, 'id'>> = (props) => {
			return <Component {...(props as any)} id={id} />;
		};
		return WithDefaultId;
	};
