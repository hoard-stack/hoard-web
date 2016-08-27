import AppConfig from './common/app-config'
import routes from './routes';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = AppConfig.title;
    config.map(routes);
  }
}
