import { IsString, IsOptional } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: 'pending' | 'approved' | 'rejected';
}
