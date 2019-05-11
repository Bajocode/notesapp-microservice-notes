import boom from 'boom';
import AMongooseRepository from './AMongooseRepository';
import IHttpResponse from './IHttpResponse';
import { Document } from 'mongoose';
import IController from './IController';

export default abstract class AMongooseController<T extends Document> implements IController {
  protected constructor(private readonly repository: AMongooseRepository<T>,
                        protected readonly domainName: string) {}

  public async handlePost(body: any): Promise<IHttpResponse> {
    const document = await this.repository.createOne(body as T);

    return {
      statusCode: 201,
      body: document.toJSON(),
      headers: { location: `/${this.domainName}/${document.id}` },
    };
  }

  public async handleGet(): Promise<IHttpResponse> {
    const documents = await this.repository.readAll();
    const transportObjects = documents.map(i => i.toJSON());

    return {
      statusCode: 200,
      body: transportObjects,
    };
  }
}
