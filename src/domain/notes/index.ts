import { Server } from 'hapi';
import { IMongoContext } from '../../mongo';
import NoteRouter from './NoteRouter';
import NoteController from './NoteController';
import IDomainValidator from '../common/IDomainValidator';

const init = (server: Server, context: IMongoContext, validator: IDomainValidator) => {
  const controller = new NoteController(context);

  new NoteRouter(server, controller, validator);
};

export default init;
