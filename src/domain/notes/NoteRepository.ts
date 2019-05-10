import MongooseRepository from '../common/repository/MongooseRepository';
import { INoteModel, noteSchema } from './note';

export default class NoteRepository extends MongooseRepository<INoteModel> {
  public constructor() {
    super('Note', noteSchema);
  }
}
