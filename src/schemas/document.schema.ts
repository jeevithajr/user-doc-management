import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentDocument = DocumentModel & Document;

@Schema({ timestamps: true })
export class DocumentModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  fileUrl: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
