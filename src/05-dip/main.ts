// In this example, our application only depends of the interfaces.
import Application from './Application';
import ServiceFactoryImpl from './ServiceFactoryImpl';

const factory = new ServiceFactoryImpl();
const app = new Application(factory);
app.run();
