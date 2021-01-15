import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entit';
import { Auth } from './auth.entit';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => {
      return {
        secret: 'zaid',signOptions: {
          expiresIn: '7d',
          },
      };
    },
  
  }),],
  exports: [TypeOrmModule,PassportModule,AuthService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
