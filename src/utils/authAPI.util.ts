import axios from 'axios';
import Cookies from 'js-cookie';
import storageService from '@/services/storageServices';
import storageKeys from '@/config/storageKeys';
import { environment } from '@environments/environment'

const authAPI = axios.create({
	baseURL: environment.authUrl,
});

// Add a request interceptor
authAPI.interceptors.request.use(
	async (config) => {
		const access_token = storageService.getAccessToken();

		if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`;
		}
       // config.headers['X-RapidAPI-Key'] = environment.apiKey;
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
authAPI.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = Cookies.get(storageKeys.refreshToken);
				const response = await authAPI.post('/auth/refreshtoken', {
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

authAPI.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default authAPI;