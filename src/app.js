export class App {
  leftNav;
  configureRouter(config, router) {
    config.title = 'Aurelia Assistant';
    config.map([
      { route: ['', 'face'], name: 'face', moduleId: 'routes/face/index',  nav: true, title: 'Face' },
      { route: 'flows', name: 'flows', moduleId: 'routes/flows/index', nav: true, title: 'Flows' },
      { route: 'admin', name: 'admin', moduleId: 'routes/admin/index', nav: true, title: 'Admin' }
    ]);
    this.router = router;
  }
}
