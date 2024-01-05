export interface IRequestHeaders {
  [key: string]: string;
}

export interface IRequestData {
  baseUrl: string;
  query: string;
  variables?: string;
  requestHeaders?: string;
}
