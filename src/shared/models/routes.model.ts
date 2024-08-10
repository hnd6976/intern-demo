import React from 'react';

export interface IRoute {
	path: string;
	component:
		| React.Component<any>
		| React.ComponentType<any>
		| React.ReactNode
		| any;
	layout:
		| React.Component<any>
		| React.ComponentType<any>
		| React.ReactNode
		| any;
}
