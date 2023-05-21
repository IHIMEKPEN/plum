import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_KEY } from '../configs';
import { IUser } from '../interfaces';
import { UserService } from '../services';
import { AppError, AuthError, asyncWrapper } from '../utils';

export interface IUserRequest extends Request {
  user?: IUser;
  foundUser?: IUser;

}

class AuthMiddleare {
  constructor(private readonly userService: UserService) { }

  /**
   * @method authenticate
   * @param req request object
   * @param res response object
   * @param next express next function
   */
  public authenticate = asyncWrapper(async (req: IUserRequest, res: Response, next: NextFunction) => {
    let token = '';
    /** Determing the time of authorization header used, must be 'Bearer Auth' */
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    token = req.cookies["token"] || token;

    if (!token) {
      const errorMessage = 'user not authenticated';
      const possibleSolution = 'login and try again';
      return next(new AuthError(errorMessage, 'token', possibleSolution));
    }

    const payload = <IUser>verify(token, JWT_KEY);
    const _user = await this.userService.get(payload._id);

    if (!_user) {
      const errorMessage = 'invalid or expired token provided';
      const possibleSolution = 'login and try again';
      return next(new AuthError(errorMessage, 'token', possibleSolution));
    }

    if (!_user.isVerified) {
      const errorMessage = 'user not verified';
      const possibleSolution = 'try verifying your email address to proceed';
      return next(new AuthError(errorMessage, 'email', possibleSolution));
    }

    req.user = _user;
    next();
  });
  
  
}

export const authMiddleware = new AuthMiddleare(new UserService());
