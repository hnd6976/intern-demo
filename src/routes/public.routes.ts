import { IRoute } from '@shared/models/routes.model';
import appRoutes from '@config/appRoutes';

import DefaultLayout from '@/layouts/DefaultLayout/Index';
import Search from '@/pages/Search/Index';
import Login from '@/pages/Login/Index';
import Register from '@/pages/Register/Index';
import Home from '@/pages/Home/Index';

const publicRoutes: IRoute[] = [
	
	{
		path: appRoutes.home,
		layout: DefaultLayout,
		component: Home,
	},
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
