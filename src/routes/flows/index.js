import {App} from 'app';
import {Session} from 'services/session';

export class Index {
  static inject = [App, Session];
  constructor(app, session) {
    this.leftNav = app.leftNav;
    this.session = session;
  }
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'list', moduleId: 'flows/routes/list',  nav: true, title: 'List' },
      { route: ':id/edit', name: 'edit', moduleId: 'flows/routes/edit', nav: false, title: 'Edit' },
      { route: ':id/show', name: 'show', moduleId: 'flows/routes/show', nav: false, title: 'Show' }
    ]);
    this.router = router;
  }
  activate() {
    this.leftNav.setSubRoutes(this.router.navigation);
  }
}
