const modulePrefix = 'features';

export default [
  {
    route:    '',
    moduleId: `${modulePrefix}/home/landing`,
    name:     'landing',
    title:    'Get started'
  },
  {
    route:    'profile',
    moduleId: `${modulePrefix}/account/profile`,
    name:     'profile',
    title:    'Profile',
    nav:      true,
    reqLogin: true
  },
  {
    route:             'register',
    moduleId:          `${modulePrefix}/account/register`,
    name:              'register',
    title:             'Register',
    nav:               true,
    navHideIfLoggedIn: true,
    hideNavbar:        true
  },
  {
    route:             'login',
    moduleId:          `${modulePrefix}/account/login`,
    name:              'login',
    title:             'Login',
    nav:               true,
    navHideIfLoggedIn: true,
    hideNavbar:        true
  }
]
