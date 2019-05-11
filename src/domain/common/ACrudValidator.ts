import joi from 'joi';

export default abstract class ACrudValidator {
  public abstract payloadCreateSchema: joi.ObjectSchema;
  public abstract payloadUpdateSchema: joi.ObjectSchema;
  public readonly paramsObjectIdSchema = joi.string()
                                            .required()
                                            .regex(/^[0-9a-fA-F]{24}$/);
  public readonly jwtSchema = joi
    .object({
      authorization: joi.string()
                        .required(),
    })
    .unknown();
}
