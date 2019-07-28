import axios from 'axios';

const API_URL = 'http://localhost:3000';

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

securedAxiosInstance.interceptors.request.use((config) => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    };
  }
  return config;
});

securedAxiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    // Refresh request if 401 response due to expired access cookie
    return plainAxiosInstance
      .post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then((response) => {
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;
        // And after successful refresh - repeat the original request
        const retryConfig = error.response.config;
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;
        return plainAxiosInstance.request(retryConfig);
      })
      .catch((refreshError) => {
        delete localStorage.csrf;
        delete localStorage.signedIn;
        // redirect to signin in case refresh request fails
        window.location.replace('/');
        return Promise.reject(refreshError);
      });
  }
  return Promise.reject(error);
});

export { plainAxiosInstance, securedAxiosInstance };
