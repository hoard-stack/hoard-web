define('app',['exports', './common/app-config', './routes'], function (exports, _appConfig, _routes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _appConfig2 = _interopRequireDefault(_appConfig);

  var _routes2 = _interopRequireDefault(_routes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = _appConfig2.default.title;
      config.map(_routes2.default);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('routes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var modulePrefix = 'features';

  exports.default = [{
    route: '',
    moduleId: modulePrefix + '/home/landing',
    name: 'landing',
    title: 'Get started'
  }, {
    route: 'profile',
    moduleId: modulePrefix + '/account/profile',
    name: 'profile',
    title: 'Profile',
    nav: true,
    reqLogin: true
  }, {
    route: 'register',
    moduleId: modulePrefix + '/account/register',
    name: 'register',
    title: 'Register',
    nav: true,
    navHideIfLoggedIn: true,
    hideNavbar: true
  }, {
    route: 'login',
    moduleId: modulePrefix + '/account/login',
    name: 'login',
    title: 'Login',
    nav: true,
    navHideIfLoggedIn: true,
    hideNavbar: true
  }];
});
define('common/app-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var AppConfig = {
    title: 'Hoard',
    apiUrl: 'http://localhost:666',
    apiTokenStorageKey: 'apiToken',
    defaultLanguage: 'en'
  };

  exports.default = AppConfig;
});
define('middleware/authorize-step',['exports', 'aurelia-framework', '../services/auth-service', 'aurelia-router'], function (exports, _aureliaFramework, _authService, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _authService2 = _interopRequireDefault(_authService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthorizeStep = (_dec = (0, _aureliaFramework.inject)(_authService2.default), _dec(_class = function () {
    function AuthorizeStep(authService) {
      _classCallCheck(this, AuthorizeStep);

      this.authService = authService;
    }

    AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
      if (navigationInstruction.getAllInstructions().some(function (i) {
        return i.config.reqLogin;
      })) {
        if (!this.authService.isLoggedIn) {
          return next.cancel(new _aureliaRouter.Redirect('login'));
        }
      }
      return next();
    };

    return AuthorizeStep;
  }()) || _class);
  exports.default = AuthorizeStep;
});
define('middleware/pre-login-url',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PreLoginUrl = function () {
    function PreLoginUrl() {
      _classCallCheck(this, PreLoginUrl);
    }

    PreLoginUrl.prototype.run = function run(routingContext, next) {
      var skipRoutes = ['login', 'register'];
      if (skipRoutes.indexOf(routingContext.config.name) === -1) {
        this.url = routingContext.fragment;
      }
      return next();
    };

    return PreLoginUrl;
  }();

  exports.default = PreLoginUrl;
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/auth-service',['exports', 'aurelia-framework', '../common/app-config'], function (exports, _aureliaFramework, _appConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _appConfig2 = _interopRequireDefault(_appConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var AuthService = (_dec = (0, _aureliaFramework.inject)(_appConfig2.default), _dec(_class = function () {
    function AuthService(appConfig) {
      _classCallCheck(this, AuthService);

      this.appConfig = appConfig;
    }

    AuthService.prototype.removeApiToken = function removeApiToken() {
      localStorage.removeItem(this.appConfig.apiTokenStorageKey);
    };

    AuthService.prototype.authorizeRequest = function authorizeRequest(request) {
      if (this.apiToken && request.headers.append) {
        request.headers.append('Authorization', 'Token ' + this.apiToken);
      }
      return request;
    };

    _createClass(AuthService, [{
      key: 'apiToken',
      get: function get() {
        return localStorage.getItem(this.appConfig.apiTokenStorageKey);
      },
      set: function set(newToken) {
        localStorage.setItem(this.appConfig.apiTokenStorageKey, newToken);
      }
    }, {
      key: 'isLoggedIn',
      get: function get() {
        return !!this.apiToken;
      }
    }]);

    return AuthService;
  }()) || _class);
  exports.default = AuthService;
});
define('features/account/login',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Login = exports.Login = function Login() {
    _classCallCheck(this, Login);
  };
});
define('features/account/profile',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Profile = exports.Profile = function Profile() {
    _classCallCheck(this, Profile);
  };
});
define('features/account/register',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Register = exports.Register = function Register() {
    _classCallCheck(this, Register);
  };
});
define('features/home/landing',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Landing = exports.Landing = function Landing() {
    _classCallCheck(this, Landing);

    this.message = 'Hello!';
  };
});
define('features/nav/nav-bar',['exports', 'aurelia-framework', 'aurelia-router', '../../services/auth-service'], function (exports, _aureliaFramework, _aureliaRouter, _authService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  var _authService2 = _interopRequireDefault(_authService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _authService2.default), _dec(_class = function () {
    function NavBar(router, authService) {
      _classCallCheck(this, NavBar);

      this.router = router;
      this.authService = authService;
    }

    NavBar.prototype.loadNavigation = function loadNavigation() {
      var customNav = [];
      for (var _iterator = this.router.navigation, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var navModel = _ref;

        if (!(this.authService.isLoggedIn && navModel.config.navHideIfLoggedIn || !this.authService.isLoggedIn && navModel.config.reqLogin)) {
          customNav.push(navModel);
        }
      }
      return customNav;
    };

    NavBar.prototype.bind = function bind() {
      this.navigation = this.loadNavigation();
    };

    NavBar.prototype.logout = function logout() {
      this.authService.removeApiToken();
      history.go(0);
    };

    return NavBar;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  \t<header>\r\n\t  <nav class=\"white_transparent\" role=\"navigation\">\r\n\t    <div class=\"nav-wrapper container\">\r\n\t      <a id=\"logo-container\" href=\"#\" class=\"brand-logo\"></a>\r\n\t      <ul class=\"right hide-on-med-and-down\">\r\n\t        <li><a href=\"/\">Home</a></li>\r\n\t        <li><a href=\"/#us\">About us</a></li>\r\n\t        <li><a href=\"/#profile\">Profile</a></li>\r\n\t      </ul>\r\n\t      <ul id=\"nav-mobile\" class=\"side-nav\">\r\n\t        <li><a href=\"/\">Home</a></li>\r\n\t        <li><a href=\"/#us\">About us</a></li>\r\n\t        <li><a href=\"/#profile\">Profile</a></li>\r\n\t      </ul>\r\n\t      <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\r\n\t    </div>\r\n\t  </nav>\r\n\t</header>\r\n  <nav-bar router.bind=\"router\" if.bind=\"!router.currentInstruction.config.hideNavbar\"></nav-bar>\r\n  <router-view></router-view>\r\n  <footer class=\"white_transparent\">\r\n    <div class=\"footer-copyright  center-align\">\r\n      <div class=\"container teal-text text-lighten-5\">\r\n      have a nice day!\r\n      </div>\r\n    </div>\r\n  </footer>\r\n</template>\r\n"; });
define('text!features/account/login.html', ['module'], function(module) { module.exports = "<template>\r\n<div id=\"index-banner\" class=\"parallax-container\">\r\n  <div class=\"section no-pad-bot\">\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n       <div class=\"col s4\">\r\n         <!-- Promo Content 1 goes here -->\r\n       </div>\r\n       <div class=\"col s4 center\">\r\n         <h1 class=\"header teal-text text-lighten-5\">Hoard </h1>\r\n         <h5 class=\"header col s12 light\">Login</h5>\r\n         <%if (message.length > 0) { %>\r\n          <div class=\"error\"><%= message %></div>\r\n          <% } %>\r\n         <form action=\"/login\" method=\"post\">\r\n           <input placeholder=\"Email\" type=\"text\" name=\"email\">\r\n           <input placeholder=\"Password\" type=\"password\" name=\"password\">\r\n           <button class=\"btn btn-warning brn-lg\" type=\"submit\">Login</button>\r\n         </form>\r\n         <p class=\"under-form\">Need an account? <a href=\"/register\">Register</a></p>\r\n         <p class=\"under-form\">Or go <a href=\"/\">home</a></p>\r\n       </div>\r\n       <div class=\"col s4\">\r\n         <!-- Promo Content 3 goes here -->\r\n       </div>\r\n     </div>\r\n</div>\r\n</div>\r\n  <div class=\"parallax\"><div class=\"stars\"></div>\r\n  <div class=\"twinkling\"></div></div>\r\n</div>\r\n</template>\r\n"; });
define('text!features/account/profile.html', ['module'], function(module) { module.exports = "<template>\r\n  <div id=\"index-banner\" class=\"parallax-container\">\r\n    <div class=\"section profile\">\r\n      <div class=\"container\">\r\n         <h3 class=\"center header col s12 light\">\r\n        <%if (user.local.name && user.local.name.length > 0) { %>\r\n         Hi <%= user.local.name %>\r\n          <% } else if (user.local.email.length > 0)  { %>\r\n            Hi <%= user.local.email %>\r\n          <% } else { %>\r\n              Hi!\r\n          <% } %>\r\n        </h3>\r\n            <div class=\"row\">\r\n\r\n              <div class=\"col s4 center\">\r\n                <i class=\"material-icons circle folder\">folder</i>\r\n              </div>\r\n              <div class=\"col s4 center\">\r\n                <i class=\"material-icons circle folder\">folder</i>\r\n              </div>\r\n              <div class=\"col s4 center\">\r\n                <i class=\"material-icons circle folder\">folder</i>\r\n              </div>\r\n            </div>\r\n            <h3 class=\"center header col s12 light\">Links floating in space</h3>\r\n            <div class=\"row\">\r\n              <div class=\"col s3 \"></div>\r\n              <div class=\"col s6 \">\r\n                <ul class=\"collection\">\r\n                  <li class=\"collection-item avatar\">\r\n                    <i class=\"material-icons circle\">mode_edit</i>\r\n                    <span class=\"title\">www.youtube.com/g77jKAjhash8</span>\r\n                    <p>Piotr Gankiewicz</p>\r\n                    <a href=\"#!\" class=\"secondary-content\"><i class=\"material-icons\">grade</i></a>\r\n                  </li>\r\n\r\n                </ul>\r\n              </div>\r\n              <div class=\"col s3 \"></div>\r\n            </div>\r\n      </div>\r\n</div>\r\n<div class=\"parallax\"><div class=\"stars\"></div>\r\n<div class=\"twinkling\"></div></div>\r\n</div>\r\n<div class=\"observatory\">\r\n  <img src=\"/img/observatory.png\" class=\"obs\">\r\n</div>\r\n</template>\r\n"; });
define('text!features/account/register.html', ['module'], function(module) { module.exports = "<template>\r\n<div id=\"index-banner\" class=\"parallax-container\">\r\n<div class=\"section no-pad-bot\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n     <div class=\"col s4\">\r\n       <!-- Promo Content 1 goes here -->\r\n     </div>\r\n     <div class=\"col s4 center\">\r\n       <h1 class=\"header teal-text text-lighten-5\">Hoard </h1>\r\n       <h5 class=\"header col s12 light\">Register</h5>\r\n       <%if (message.length > 0) { %>\r\n        <div class=\"error\"><%= message %></div>\r\n        <% } %>\r\n       <form action=\"/register\" method=\"post\">\r\n         <input placeholder=\"Email\" type=\"text\" name=\"email\">\r\n         <input placeholder=\"Password\" type=\"password\" name=\"password\">\r\n         <button class=\"btn btn-warning brn-lg\" type=\"submit\">Register</button>\r\n       </form>\r\n       <p class=\"under-form\">Already have an account? <a href=\"/login\">Log in</a></p>\r\n       <p class=\"under-form\">Or go <a href=\"/\">home</a></p>\r\n     </div>\r\n     <div class=\"col s4\">\r\n       <!-- Promo Content 3 goes here -->\r\n     </div>\r\n   </div>\r\n</div>\r\n</div>\r\n<div class=\"parallax\"><div class=\"stars\"></div>\r\n<div class=\"twinkling\"></div></div>\r\n</div>\r\n</template>\r\n"; });
define('text!features/home/landing.html', ['module'], function(module) { module.exports = "<template>\r\n  <div id=\"index-banner\" class=\"parallax-container\">\r\n    <div class=\"section no-pad-bot\">\r\n      <div class=\"container\">\r\n        <h1 class=\"header center teal-text text-lighten-5\">Hoard</h1>\r\n        <div class=\"row center\">\r\n          <img src=\"content/img/rocket-ship2.png\" id=\"rocket\">\r\n          <h5 class=\"header col s12 light underrocket\">Personal space for all links you need.</h5>\r\n        </div>\r\n        <div class=\"row center underrocketsmall\">\r\n          <a href=\"/#login\" class=\"btn-large waves-effect waves-light border\">Login</a>\r\n          <a href=\"/#register\" class=\"btn-large waves-effect waves-light border\">Register</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"parallax\"><div class=\"stars\"></div>\r\n    <div class=\"twinkling\"></div></div>\r\n  </div>\r\n</template>\r\n"; });
define('text!features/nav/nav-bar.html', ['module'], function(module) { module.exports = "<template>\r\n  <nav role=\"navigation\" class=\"ft-nav\">\r\n    <div class=\"container\">\r\n      <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse right\">\r\n        <i class=\"material-icons\">menu</i>\r\n      </a>\r\n      <ul class=\"right hide-on-med-and-down\">\r\n        <!-- We can use row.isActive and row.isNavigating here for indicators -->\r\n        <li repeat.for=\"row of navigation\">\r\n          <a href.bind=\"row.href\">\r\n            <i class=\"material-icons left\">${row.settings.icon}</i>\r\n            <span t=\"common.${row.config.name}\"></span>\r\n          </a>\r\n        </li>\r\n        <li if.bind=\"authService.isLoggedIn\">\r\n          <a href=\"#\" click.delegate=\"logout()\">\r\n            <span t=\"common.logout\"></span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <ul class=\"side-nav\" id=\"nav-mobile\">\r\n        <li repeat.for=\"row of router.navigation\">\r\n          <a href.bind=\"row.href\">\r\n            <i class=\"material-icons left\">${row.settings.icon}</i>\r\n            <span t=\"common.${row.title}\"></span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map