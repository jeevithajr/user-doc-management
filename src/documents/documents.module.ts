import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsService } from '../documents/documents.service';
import { DocumentsController } from '../documents/documents.controller';
import { Document, DocumentSchema } from '../documents/document.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Document.name, schema: DocumentSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
