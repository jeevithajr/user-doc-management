import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type DocumentDocument = Document & MongooseDocument;

@Schema({ timestamps: true })
export class Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  filePath: string; // Path where the file is stored

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
