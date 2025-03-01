import { Controller, Post, Get, Param, Delete, Put, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DocumentsService } from '../services/documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('name') name: string, @Body('description') description: string) {
    console.log(file);
    if (!file) {
        throw new Error('File is undefined! Check Postman request.');
      }
    const fileUrl = `/uploads/${file.filename}`;
    return this.documentsService.createDocument(name, description, fileUrl);
  }

  @Get()
  getAllDocuments() {
    return this.documentsService.getAllDocuments();
  }

  @Get(':id')
  getDocumentById(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  @Put(':id')
  updateDocument(@Param('id') id: string, @Body() body: { name?: string; description?: string }) {
    return this.documentsService.updateDocument(id, body.name, body.description);
  }

  @Delete(':id')
  deleteDocument(@Param('id') id: string) {
    return this.documentsService.deleteDocument(id);
  }
}
