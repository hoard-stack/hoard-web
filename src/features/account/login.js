import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import ApiService from '../../services/api-service';
import AuthService from '../../services/auth-service';
import AppConfig from '../../common/app-config';

@inject(Router, ApiService, AuthService, AppConfig)
export class Login {
  constructor() {
  }
}
