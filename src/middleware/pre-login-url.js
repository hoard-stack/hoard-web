export default class PreLoginUrl {
  run(routingContext, next) {
    let skipRoutes = ['login', 'register'];
    if (skipRoutes.indexOf(routingContext.config.name) === -1) {
      this.url = routingContext.fragment;
    }
    return next();
  }
}
