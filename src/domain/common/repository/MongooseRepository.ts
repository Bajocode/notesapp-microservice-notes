import { Document, model, Model, Schema } from 'mongoose';
import IRepository from './IRepository';

export default abstract class MongooseRepository<T extends Document> implements IRepository<T> {
  protected readonly mongooseModel: Model<T>;

  protected constructor(modelName: string, schema: Schema) {
    this.mongooseModel = model<T>(modelName, schema);
  }

  public createOne(item: T): Promise<T> {}

  public createMany(items: T[]): Promise<T[]> {}

  public readOne(id: string): Promise<T | null> {}

  public read(predicate: any): Promise<T[]> {}

  public readAll(): Promise<T[]> {}

  public deleteOne(id: string): Promise<T | null> {}

  public deleteMany(ids: string[]): Promise<T[]> {}
}
