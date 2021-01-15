import { User } from 'src/users/user.entit';
import { Column } from 'typeorm';
import { JwtPayload } from '../helper/jwtPayload';
import { AuthService } from './auth.service';
import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Auth } from './auth.entit';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    token:string;
  constructor(private auth:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey:'zaid',
      passReqToCallback: false,
    });
  }

    async validate(payload: JwtPayload): Promise<User> {
      
        
        const user = await this.auth.findByPayload(payload);
        if (!user) {

            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}   


