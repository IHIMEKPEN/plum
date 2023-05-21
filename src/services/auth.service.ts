import { Injectable } from '@nestjs/common';
import {APP_NAME} from '../configs'
import {
  AppError,
  codeGenerator,
  compareHash,
  DuplicateKeyError,
  hashData,
  logger,
  signToken,
  ValidationError,
} from '../utils';
import { UserService } from './index';
import { IUser } from 'src/interfaces';
@Injectable()
export class AuthService {
  private readonly userService = new UserService();

  public async register(userData: {  email: string,password:string }): Promise<IUser> {
    let {email,password}=userData
    if (!password) throw new ValidationError('password field is required', 'password', '', 'password-required');
    if (!email) throw new ValidationError('email address field is required', 'email', '', 'email-required');
    let user = await this.userService.findOne({ email } );
    if (user) throw new DuplicateKeyError('', 'email', email);
    password= await hashData(password);
    user = await this.userService.create({  email, password });
    //send email
    
    return user;
  }
  async login(): Promise<string> {
    return `this is login service`;
  }
}
