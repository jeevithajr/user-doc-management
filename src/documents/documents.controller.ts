import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocumentsService } from '../documents/documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from '../documents/document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
            }
        })
    }))
    
    uploadFile(@UploadedFile() file: Express.Multer.File) { 
        console.log('Uploaded File:', file);
        return { message: 'File uploaded successfully!', filePath: file.path };
    }

    async create(@Body() createDocumentDto: CreateDocumentDto, @UploadedFile() file: Express.Multer.File) {
        return this.documentsService.create(createDocumentDto, file.path);
    }

    @Get()
    async findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.documentsService.remove(id);
    }
}
