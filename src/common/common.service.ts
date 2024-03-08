import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { isValidUUID } from 'src/utils';

@Injectable()
export class CommonService {
  public validateUUID(uuid: string) {
    if (!isValidUUID(uuid)) {
      throw new HttpException(MESSAGES.NOT_UUID, HttpStatus.BAD_REQUEST);
    }
  }
}
