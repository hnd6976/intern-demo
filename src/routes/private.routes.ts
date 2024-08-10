import { IRoute } from '@shared/models/routes.model';
import appRoutes from '@config/appRoutes';

import MainLayout from '@layouts/MainLayout';
import Search from '@/pages/Search';



const privateRoutes: IRoute[] = [
	{
		path: appRoutes.search,
		layout: MainLayout,
		component: Search,
	},
];

export default privateRoutes;
