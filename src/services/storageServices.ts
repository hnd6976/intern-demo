import storageKeys from '@config/storageKeys';

class StorageService {
	setItem(key: string, value: any) {
		try {
			const jsonValue = JSON.stringify(value);
			localStorage.setItem(key, jsonValue);
		} catch (error) {
			console.error('Error storing item in localStorage', error);
		}
	}

	// Method to retrieve data from localStorage
	getItem(key: string) {
		try {
			const jsonValue = localStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (error) {
			console.error('Error getting item from localStorage', error);
			return null;
		}
	}

	// Method to remove data from localStorage
	removeItem(key: string) {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing item from localStorage', error);
		}
	}

	// Method to clear all data from localStorage
	clear() {
		try {
			localStorage.clear();
		} catch (error) {
			console.error('Error clearing localStorage', error);
		}
	}

	// Method to store access token in localStorage
	setAccessToken(token: string) {
		this.setItem(storageKeys.accessToken, token);
	}

	// Method to retrieve access token from localStorage
	getAccessToken() {
		return this.getItem(storageKeys.accessToken);
	}

	// Method to remove access token from localStorage
	removeAccessToken() {
		this.removeItem(storageKeys.accessToken);
	}
}

export default new StorageService();