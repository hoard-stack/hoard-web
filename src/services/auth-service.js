import {inject} from 'aurelia-framework';
import AppConfig from '../common/app-config';

@inject(AppConfig)
export default class AuthService {
  constructor(appConfig) {
    this.appConfig = appConfig;
  }

  get apiToken() {
    return localStorage.getItem(this.appConfig.apiTokenStorageKey);
  }

  set apiToken(newToken) {
    localStorage.setItem(this.appConfig.apiTokenStorageKey, newToken);
  }

  removeApiToken() {
    localStorage.removeItem(this.appConfig.apiTokenStorageKey);
  }

  get isLoggedIn() {
    return !!this.apiToken;
  }

  authorizeRequest(request) {
    if (this.apiToken && request.headers.append) {
      request.headers.append('Authorization', `JWT ${this.apiToken}`);
    }
    return request;
  }
}
