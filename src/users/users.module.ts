import { JwtStrategy } from '../auth/jwt.startegy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './user.entit';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({

  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false
  }),
  AuthModule,

  JwtModule.register({
    secret: 'zaid', signOptions: {
      expiresIn: '10000s',
    },
}),],
  exports: [TypeOrmModule, PassportModule, JwtModule],
  providers: [UsersService,JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule { }
