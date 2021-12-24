import Service from './Service';

export default class ServiceConcreteImpl implements Service {
  execute(): void {
    console.log('My cool concrete service!!');
  }
}
