import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AuthService from '../../services/auth-service';

@inject(Router, AuthService)
export class NavBar {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }

  loadNavigation() {
    let customNav = [];
    for (let navModel of this.router.navigation) {
      if (!
          ((  this.authService.isLoggedIn && navModel.config.navHideIfLoggedIn ) ||
           ( !this.authService.isLoggedIn && navModel.config.reqLogin ))) {
            customNav.push(navModel);
          }
    }
    return customNav;
  }

  bind() {
    this.navigation = this.loadNavigation();
  }

  logout() {
    this.authService.removeApiToken();
    history.go(0);
  }
}
