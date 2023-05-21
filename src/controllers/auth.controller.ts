import {Request,Response, Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/interfaces';
import { httpResponse } from 'src/utils';
import _ from 'underscore';
import { Request as IRequest, Response as IResponse, NextFunction } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/v1/register')
  async register(  @Request() req:IRequest,@Response() res:IResponse,): Promise<void> {
    let user= await this.authService.register(req.body);
    const filtered = _.pick(user,  'email', 'isVerified');
    res.status(200)
      .json(httpResponse('user registration successful', { user: filtered }));
  }

  @Post('/api/v1/login')
 async login(): Promise<string> {
    return await this.authService.login();
  }
  @Get()
 health(@Request() req:IRequest,@Response() res:IResponse,): void {
  res.status(200)
  //  .setHeader("Set-Cookie", ["token=" + token])
    .json(httpResponse('APIs running', ));

  }
}
