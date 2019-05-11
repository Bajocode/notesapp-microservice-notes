import AMongooseController from '../common/AMongooseController';
import { IMongoContext } from '../../mongo';
import { INoteModel } from './note';

export default class NoteController extends AMongooseController<INoteModel> {
  public constructor(private readonly context: IMongoContext) {
    super(context.notes, 'notes');
  }
}
