import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import ApiService from '../../services/api-service';
import AuthService from '../../services/auth-service';
import AppConfig from '../../common/app-config';

@inject(Router, ApiService, AuthService, AppConfig)
export class Login {
  constructor(router, apiService, authService, appConfig) {
  	this.apiService = apiService;
  	this.defaultRedirectRoute = 'profile';
	this.email = '';
    this.password = '';
  }

  async submitLogin() {
    this.errorMessage = null;
    const response = await this.apiService.post('login', {
      email:    this.email,
      password: this.password
    });
    if (response.token) {
      this.authService.apiToken = response.token;
      this.router.navigateToRoute(this.defaultRedirectRoute);
    } else {
      alert("Invalid credentials.");
    }
  }
}
