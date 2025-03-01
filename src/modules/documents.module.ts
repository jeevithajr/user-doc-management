import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsService } from '../services/documents.service';
import { DocumentsController } from '../controllers/documents.controller';
import {DocumentModel, DocumentSchema } from '../schemas/document.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DocumentModel.name, schema: DocumentSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
