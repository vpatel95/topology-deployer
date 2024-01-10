import useAuth from 'hooks/useAuth';
import {useEffect} from 'react';
import {redirect} from 'react-router-dom';
import {Axios as AxiosAuth} from 'services/api';

const useAxiosAuth = () => {
  const {auth} = useAuth();

  useEffect(() => {
    const requestInterceptor = AxiosAuth.interceptors.request.use(
      config => {
        if (auth?.accessToken) {
          config.headers.Authorization = `${auth.accessToken}`;
        }

        return config;
      }, (error) => Promise.reject(error)
    );

    const responseInterceptor = AxiosAuth.interceptors.response.use(
      response => response,
      async (error) => {
        if (error?.response?.status === 401) {
          redirect('/auth/login', {replace: true});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      AxiosAuth.interceptors.request.eject(requestInterceptor);
      AxiosAuth.interceptors.response.eject(responseInterceptor);
    }

  }, [auth]);

  return AxiosAuth;
};

export default useAxiosAuth;
