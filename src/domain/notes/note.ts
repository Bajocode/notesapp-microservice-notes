import { Schema, Document } from 'mongoose';

export interface INote {
  title: string;
  body: string;
  userId: string;
}

export interface INoteModel extends INote, Document {}

export const noteSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
},                                   { toJSON: {
  versionKey: false,
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
  },
}});
