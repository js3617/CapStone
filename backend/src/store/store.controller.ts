import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './test';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.storeService.importStores();
  }
}
