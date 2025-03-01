import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentDocument } from '../documents/document.schema';
import { CreateDocumentDto, UpdateDocumentDto } from '../documents/document.dto';

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(Document.name) private documentModel: Model<DocumentDocument>) {}

  async create(createDocumentDto: CreateDocumentDto, filePath: string): Promise<Document> {
    const newDocument = new this.documentModel({ ...createDocumentDto, filePath });
    return newDocument.save();
  }

  async findAll(): Promise<Document[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentModel.findById(id);
    if (!document) throw new NotFoundException(`Document with ID ${id} not found`);
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    const updatedDocument = await this.documentModel.findByIdAndUpdate(id, updateDocumentDto, { new: true });
    if (!updatedDocument) throw new NotFoundException(`Document with ID ${id} not found`);
    return updatedDocument;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.documentModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Document with ID ${id} not found`);
  }
}
