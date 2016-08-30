const modulePrefix = 'features';

export default [
  {
    route:    '',
    moduleId: `${modulePrefix}/home/landing`,
    name:     'landing',
    title:    'Get started'
  },
  {
    route:    'about',
    moduleId: `${modulePrefix}/home/about`,
    name:     'about',
    title:    'About us',
    settings: {
        hideNavbar:        true,
        navHideAfterLogin: true
    }
  },
  {
    route:    'profile',
    moduleId: `${modulePrefix}/account/profile`,
    name:     'profile',
    title:    'Profile',
    settings: {
        reqLogin:        true
    }
  },
  {
    route:             'register',
    moduleId:          `${modulePrefix}/account/register`,
    name:              'register',
    title:             'Register',
    nav:               true,
    settings: {
        hideNavbar:        true,
        navHideAfterLogin: true
    }
  },
  {
    route:             'login',
    moduleId:          `${modulePrefix}/account/login`,
    name:              'login',
    title:             'Login',
    nav:               true,
    settings: {
        hideNavbar:        true,
        navHideAfterLogin: true
    }
  }
]
