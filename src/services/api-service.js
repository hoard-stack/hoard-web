import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import AuthService from './auth-service';
import AppConfig from '../common/app-config'
import fetch from 'whatwg-fetch';

@inject(HttpClient, AuthService, AppConfig)
export default class ApiBaseService {
  constructor(http, authService, appConfig) {
    this.http = http;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(appConfig.apiUrl)
        .withDefaults({
          headers: {
            'Content-Type':     'application/json',
            'Accept':           'application/json',
            'X-Requested-With': 'Fetch',
          }
        })
        .withInterceptor({
          request(request) {
            return authService.authorizeRequest(request);
          }
        });
    });
  }

  async get(path) {
    let response = await this.http.fetch(path);
    
    return response.json();
  }

  async post(path, params) {
    let responseObject;
    await this.http.fetch(path, {
        method: 'post',
        body: json(params)
      })
      .then(response => responseObject = response.json())
      .catch(error => responseObject = error.json());

    return responseObject;
  }
}
