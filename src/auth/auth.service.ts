import { JwtPayload } from './../helper/jwtPayload';
import { User } from './../users/user.entit';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entit';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: Auth) {
    const { email, password } = user;
    const data = await this.authRepository.findOne({ where: { email } });
    if (!data) {
      let errorResponse = new HttpException(
        'User not found',
        HttpStatus.UNAUTHORIZED,
      );
      return {
        message: errorResponse.getResponse(),
        status: errorResponse.getStatus(),
      };
    }

    const areEqual = await bcrypt.compare(user.password, data.password);
    if (!areEqual) {
      let errorResponse = new HttpException(
        'Invalid credentials given',
        HttpStatus.UNAUTHORIZED,
      );
      return {
        message: errorResponse.getResponse(),
        status: errorResponse.getStatus(),
      };
    }

    return {
      message: 'User logged In',
      Id: data.id,
      name: data.name,
      email: data.email,
      token:this.token(data),
      status: HttpStatus.OK  
       };
  }

  async register(data: User) {
    const check = await this.authRepository.findOne({
      where: [{ email: data.email }],
    });
    if (check) {
      let errorResponse = new HttpException(
        'User already exists',
        HttpStatus.UNAUTHORIZED,
      );
      return {
        message: errorResponse.getResponse(),
        status: errorResponse.getStatus(),
      };
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.authRepository.create({
        ...data,
        password: hashedPassword,
      });
      this.authRepository.insert(user);

      return {
        message: 'User added Successfully',
      };
    }
  }

  private token({ email }: Auth) {
    let user: JwtPayload = { email };
    let accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  async findByPayload({ email }: any): Promise<User> {
    return await this.authRepository.findOne({
      where: { email },
    });
  }
}
