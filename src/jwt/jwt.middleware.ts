import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if ('x-jwt' in req.headers) {
        const token = req.headers['x-jwt'];
        const payload = this.jwtService.verify(token.toString());
        if (payload instanceof JsonWebTokenError) {
          throw new Error(payload.message);
        }
        const user = await this.usersService.findUserById(payload.userId);
        // ultimately, the purpose of using middleware is to change the res and res
        req.user = user;
      }
      next();
    } catch (error) {
      return res.status(401).send({
        ok: false,
        error: error.message,
      });
    }
  }
}
