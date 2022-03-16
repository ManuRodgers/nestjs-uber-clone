import { Inject, Injectable } from '@nestjs/common';
import { JWT_MODULE_OPTIONS } from './jwt.constants';
import { JwtModuleOptions, JwtPayload } from './jwt.interface';
import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_MODULE_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: JwtPayload): string {
    return sign(payload, this.options.jwtAccessTokenSecret, {
      expiresIn: this.options.expiresIn,
    });
  }

  verify(token: string): JwtPayload | JsonWebTokenError {
    try {
      return verify(token, this.options.jwtAccessTokenSecret) as JwtPayload;
    } catch (error) {
      return error as JsonWebTokenError;
    }
  }
}
