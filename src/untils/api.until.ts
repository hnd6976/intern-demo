import axios from 'axios';
import Cookies from 'js-cookie';

import { environment } from '@environments/environment'
import storageKeys from '@config/storageKeys';
import storageService from '@services/storageServices';

const api = axios.create({
	baseURL: environment.baseUrl,
});

// Add a request interceptor
api.interceptors.request.use(
	async (config) => {
		//const access_token = storageService.getAccessToken();

		//if (access_token) {
		//	config.headers.Authorization = `Bearer ${access_token}`;

		//}
        config.headers['X-RapidAPI-Key'] = environment.apiKey;
		return Promise.resolve(config);
	},
	(error) => {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			console.error(error.response.data.message);
		} else {
			console.error(error);
			console.log('Something went wrong!');
		}
		return Promise.reject(error);
	}
);

// Add a response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = Cookies.get(storageKeys.refreshToken);
				const response = await axios.post('/auth/refresh-token', {
					refreshToken,
				});
				const { token } = response.data;

				storageService.setAccessToken(token);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				// Handle refresh token error or redirect to login
			}
		}

		return Promise.reject(error);
	}
);

export default api;