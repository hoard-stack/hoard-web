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
    // This assignment is placed in the bind callback so that the navigation
    // links can be re-rendered after the login (that navigates back to
    // the previous view).
    this.navigation = this.loadNavigation();
  }

  // TODO: This should probably be moved to a separate route, but so far
  //       I couldn't figure out how to make it work properly (with navbar refresh, etc.)
  logout() {
    this.authService.removeApiToken();
    history.go(0);
  }
}
