import AMongooseRepository from '../common/AMongooseRepository';
import { INoteModel, noteSchema } from './note';

export default class NoteRepository extends AMongooseRepository<INoteModel> {
  public constructor() {
    super('Note', noteSchema);
  }
}
