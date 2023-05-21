import { Injectable } from '@nestjs/common';
import {APP_NAME} from '../configs'
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  health(): string {
    return `${APP_NAME} APIs are running`;
  }
}
