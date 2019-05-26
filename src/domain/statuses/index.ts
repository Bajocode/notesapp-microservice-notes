import { Server } from 'hapi';
import StatusRouter from './StatusRouter';
import StatusController from './StatusController';

const init = (server: Server) => {
  const controller = new StatusController();

  new StatusRouter(server, controller, 'statuses');
};

export default init;
