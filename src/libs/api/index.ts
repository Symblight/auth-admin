import url from 'url';
import { join as joinPath } from 'path';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

const API_URL = window.config.apiURL;

interface RequestConfig<T> {
  url: string;
  header?: string[];
  unsetContentType?: boolean;
  method: TMethod;
  data?: T;
}

function getApiUrl(path: string, rootRelative?: string) {
  if (rootRelative) {
    return url.resolve(API_URL, path);
  }

  const apiUrl = url.parse(API_URL);

  const parsedPath = url.parse(path);
  const pathname = joinPath(apiUrl.pathname || '', parsedPath.pathname || '');

  return url.format({
    protocol: apiUrl.protocol,
    hostname: apiUrl.hostname,
    pathname: pathname,
    search: parsedPath.search,
  });
}

export function Request<T>(request: RequestConfig<T>) {
  const formattedUrl = getApiUrl(request.url);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Accepts: '*/*',
    ...request.header,
  };

  if (request.unsetContentType) {
    delete headers['Content-Type'];
  }

  const requestConfig: AxiosRequestConfig = {
    method: request.method,
    url: formattedUrl,
    withCredentials: true,
    headers,
    data: {
      ...request.data,
    },
  };

  return new Promise((resolve, reject) =>
    axios(requestConfig)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      }),
  );
}
