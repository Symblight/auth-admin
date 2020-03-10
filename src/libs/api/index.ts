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

interface Response<T> {
  data?: T;
}

function getApiUrl(path: string, rootRelative?: string) {
  if (rootRelative) {
    return url.resolve(API_URL, path);
  }

  const apiUrl = url.parse(API_URL);

  const parsedPath = url.parse(path);

  return url.format({
    host: apiUrl.host,
    protocol: apiUrl.protocol,
    pathname: joinPath(apiUrl.pathname || '', parsedPath.pathname || ''),
    search: parsedPath.search,
  });
}

export function Request<T>(request: RequestConfig<T>): Promise<Response<T>> {
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
        const { data } = response;
        resolve(data);
      })
      .catch((error: AxiosError) => {
        reject(error);
      }),
  );
}
