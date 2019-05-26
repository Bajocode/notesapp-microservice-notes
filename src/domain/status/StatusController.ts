import IHttpResponse from '../common/IHttpResponse';
import mongoose from 'mongoose';

export default class StatusController {
  public async handleGetReadiness(): Promise<IHttpResponse> {
    const statusCode =  mongoose.connection.readyState === 0 ? 500 : 200;

    return {
      statusCode,
    };
  }

  public async handleGetLiveness(): Promise<IHttpResponse> {
    return {
      statusCode: 200,
    };
  }
}
