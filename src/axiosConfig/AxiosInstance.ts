import AxiosUtil from "./AxiosUtil";

// Follow https://axios-http.com/docs/req_config for more info
export const businessProfileService = AxiosUtil.create(
  {
    baseURL: "http://localhost:8089",
    timeout: 500000,
  },
  { addRequestInterceptor: false }
);
