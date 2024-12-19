import axiosInstance from "./apiHelpers";

export type MethodType =
  | "get"
  | "post"
  | "delete"
  | "patch"
  | "put"
  | "head"
  | "options";

export type ConfigType = {
  url: string;
  method: MethodType;
  data?: any;
  params?: {
    page?: number;
    limit?: number;
    [key: string]: any;
  };
  headers?: {
    [key: string]: string;
  };
  config?: {
    showToast?: boolean;
    logRequest?: boolean;
  };
};

const requestAPI = async (config: ConfigType): Promise<any> => {
  try {
    if (config.config?.logRequest) {
      console.log("Request Config:", config);
    }

    const result = await axiosInstance({
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });

    return result?.data?.data || result?.data || result;
  } catch (error: any) {
    // Handle network errors
    if (!error.response) {
      console.error("Network Error:", error);
      alert(`Network Error: ${error}`);
      throw new Error("Network Error");
    }

    // Handle HTTP errors
    const status = error.response.status;
    let message = "";
    if (status >= 400 && status < 500) {
      message = error.response.data.message || error.message || "Client Error";
    } else if (status >= 500) {
      message = error.response.data.message || error.message || "Server Error";
    }

    // Show alert if showToast is true
    if (config?.config?.showToast) {
      alert(message || "On request something went wrong.");
    }

    // Rethrow the error
    throw new Error(message || "On request something went wrong.");
  }
};

export default requestAPI;
