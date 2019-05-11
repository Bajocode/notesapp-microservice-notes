import IHttpResponse from './IHttpResponse';

export default interface IController {
  handlePost: (body: any) => Promise<IHttpResponse>;
}
