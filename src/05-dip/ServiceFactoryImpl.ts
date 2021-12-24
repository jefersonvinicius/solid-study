import Service from './Service';
import ServiceConcreteImpl from './ServiceConcreteImpl';
import ServiceFactory from './ServiceFactory';

export default class ServiceFactoryImpl implements ServiceFactory {
  makeSvc(): Service {
    return new ServiceConcreteImpl();
  }
}
