import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Follow https://axios-http.com/docs/req_config for more info
//Response Type https://axios-http.com/docs/res_schema
const create = (
  config?: AxiosRequestConfig,
  interceptors?: {
    addRequestInterceptor?: boolean;
    addResponseInterceptor?: boolean;
  }
): AxiosInstance => {
  const axiosInstance = axios.create(config);
  if (interceptors?.addRequestInterceptor) setRequestInterceptor(axiosInstance);
  if (interceptors?.addResponseInterceptor)
    setResponseInterceptor(axiosInstance);
  return axiosInstance;
};

const setRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      config.headers["Authorization"] = localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
        : undefined;
      // Do something before request is sent
      return config;
    },
    (error: any) => {
      console.log("Axios:Error ", error);

      // Do something with request error
      return Promise.reject(error);
    }
  );
};

const setResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (config: any) => {
      console.log(">>>>>>>>>Axios:Success ", config);
      //  config?.headers["Authorization"]=''
      // Do something before request is sent
      return config;
    },
    (error: any) => {
      console.log(">>>>>>>>>Axios:Error ", error);

      // Do something with request error
      return Promise.reject(error);
    }
  );
};

const setAuthorization = (instance: AxiosInstance, token: string) => {
  instance.defaults.headers.common["Authorization"] = token;
};

const AxiosUtil = {
  create,
  setAuthorization,
  setRequestInterceptor,
  setResponseInterceptor,
} as const;

export default AxiosUtil;
