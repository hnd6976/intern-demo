import { environment } from "@/environments/environment";
import axios from "axios";

const ninjasApi = axios.create({
	baseURL: environment.ninjasUrl,
});

// Add a request interceptor
ninjasApi.interceptors.request.use(
	async (config) => {
		//const access_token = storageService.getAccessToken();

		//if (access_token) {
		//	config.headers.Authorization = `Bearer ${access_token}`;

		//}
        config.headers['X-Api-Key'] = environment.ninjasKey;
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
/*countryApi.interceptors.response.use(
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
*/
ninjasApi.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default ninjasApi;