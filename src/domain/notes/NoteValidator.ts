import joi from 'joi';
import ACrudValidator from '../common/ACrudValidator';

export default class NoteValidator extends ACrudValidator {
  public readonly payloadCreateSchema = joi
    .object()
    .keys({
      title: joi.string().required(),
      body: joi.string().allow(''),
    });
  public readonly payloadUpdateSchema = joi.object();
}
