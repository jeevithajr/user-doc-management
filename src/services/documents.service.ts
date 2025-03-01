import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentModel, DocumentDocument } from '../schemas/document.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentModel.name) private documentModel: Model<DocumentDocument>,
  ) {}

  async createDocument(name: string, description: string, fileUrl: string) {
    const newDocument = new this.documentModel({ name, description, fileUrl });
    return newDocument.save();
  }

  async getAllDocuments() {
    return this.documentModel.find().exec();
  }

  async getDocumentById(id: string) {
    const doc = await this.documentModel.findById(id);
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async updateDocument(id: string, name?: string, description?: string) {
    return this.documentModel.findByIdAndUpdate(id, { name, description }, { new: true });
  }

  async deleteDocument(id: string) {
    return this.documentModel.findByIdAndDelete(id);
  }
}
