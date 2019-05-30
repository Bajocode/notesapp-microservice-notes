import { Server, ServerRoute } from 'hapi';
import { toHapiResponse } from '../common/IHttpResponse';
import AMongooseRouter from '../common/AMongooseRouter';
import NoteController from './NoteController';
import IDomainValidator from '../common/IDomainValidator';
import { INoteModel } from './note';

export default class NoteRouter extends AMongooseRouter<INoteModel> {
  public constructor(server: Server,
                     controller: NoteController,
                     validator: IDomainValidator) {
    super();

    const domainName = 'notes';

    server.route([
      super.get(controller, domainName),
      super.post(controller, validator.notes, domainName),
      super.put(controller, validator.notes, domainName),
      super.delete(controller, validator.notes, domainName),
    ]);
  }
}
