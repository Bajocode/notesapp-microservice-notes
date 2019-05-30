import boom from 'boom';
import AMongooseRepository from './AMongooseRepository';
import IHttpResponse from './IHttpResponse';
import { Document } from 'mongoose';
import IController from './IController';

export default abstract class AMongooseController<T extends Document> implements IController {
  protected constructor(private readonly repository: AMongooseRepository<T>,
                        protected readonly domainName: string) {}

  public async handleGet(): Promise<IHttpResponse> {
    const documents = await this.repository.readAll();
    const transportObjects = documents.map(i => i.toJSON());

    return {
      statusCode: 200,
      body: transportObjects,
    };
  }

  public async handlePost(body: any): Promise<IHttpResponse> {
    const document = await this.repository.createOne(body as T);

    return {
      statusCode: 201,
      body: document.toJSON(),
      headers: { location: `/${this.domainName}/${document.id}` },
    };
  }

  public async handlePut(id: string, body: any): Promise<IHttpResponse> {
    const document = await this.repository.readOne(id);

    if (!document) throw boom.notFound();

    await document.updateOne(body).exec();
    await document.save();

    return {
      statusCode: 204,
    };
  }

  public async handleDelete(id: string): Promise<IHttpResponse> {
    await this.repository.deleteOne(id);

    return {
      statusCode: 204,
    };
  }
}
