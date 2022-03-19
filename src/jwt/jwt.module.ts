import { DynamicModule, Module } from '@nestjs/common';
import { JWT_MODULE_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interface';
import { JwtService } from './jwt.service';
import { UsersModule } from '../users/users.module';

@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      imports: [UsersModule],
      providers: [
        {
          provide: JWT_MODULE_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
      global: true,
    };
  }
}
