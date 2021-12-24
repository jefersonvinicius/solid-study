import ServiceFactory from './ServiceFactory';

export default class Application {
  constructor(private serviceFactory: ServiceFactory) {}

  run() {
    const service = this.serviceFactory.makeSvc();
    service.execute();
  }
}
