import {inject} from 'aurelia-framework';
import AuthService from '../services/auth-service';
import {Redirect} from 'aurelia-router';

@inject(AuthService)
export default class AuthorizeStep {
  constructor(authService) {
    this.authService = authService;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.reqLogin)) {
      if (!this.authService.isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }
    return next();
  }
}
