import PreLoginUrl from './middleware/pre-login-url';
import AuthorizeStep from './middleware/authorize-step';
import AppConfig from './common/app-config'
import routes from './routes';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = AppConfig.title;
    config.addPipelineStep('authorize', PreLoginUrl);
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map(routes);
  }
}
