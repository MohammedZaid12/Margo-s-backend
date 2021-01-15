import { User } from './user.entit';
import { Injectable, Inject, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { pipe } from 'rxjs';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    @UseInterceptors(ClassSerializerInterceptor)
    getUser(id: number) {
        return this.usersRepository.find({
            where: [{ "id": id }]
        });
    }

    getUsers() {
        return this.usersRepository.find();
    }
    async addUsers(data: User) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.usersRepository.create({ ...data, password: hashedPassword });
        this.usersRepository.save(user);
    }
    removeUser(id: string) {
        this.usersRepository.delete(id);
    }
    async updateUser(id: number, user: User) {
        return await this.usersRepository.update(id, user);

    }


}