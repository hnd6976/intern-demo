import { IRoute } from '@shared/models/routes.model';
import appRoutes from '@config/appRoutes';

import DefaultLayout from '@layouts/DefaultLayout';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const publicRoutes: IRoute[] = [
	{
		path: appRoutes.search,
		layout: DefaultLayout,
		component: Search,
	},
	{
		path: appRoutes.login,
		layout: DefaultLayout,
		component: Login,
	},
	{
		path: appRoutes.register,
		layout: DefaultLayout,
		component: Register,
	},
	
];

export default publicRoutes;
