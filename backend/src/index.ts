import { configuration } from './config/configuration';
import Server from './server';

const server = new Server(configuration);
server.bootstrap();
server.run();
