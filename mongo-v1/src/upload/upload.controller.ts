import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('upload')
export class UploadController {
    //use this function for create file (image) uploaded with file name
  @Post()
  @UseInterceptors(
    FileInterceptor('image',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() image) {
    console.log(image);
  }

  //use this for download file again with file ID
  @Get('/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
   return res.sendFile(fileId, { root: 'uploads' });
  }

  //  s
}
