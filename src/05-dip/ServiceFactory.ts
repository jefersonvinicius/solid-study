import Service from './Service';

export default interface ServiceFactory {
  makeSvc(): Service;
}
