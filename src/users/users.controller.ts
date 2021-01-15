import { User } from './user.entit';
import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
password:string;
    constructor(private service: UsersService) { }

    @Get()
    async getUsers() {
        return {
            status: HttpStatus.OK,
            data: await this.service.getUsers(),
        };
    }
    @Get(':id')
    async getUser(@Param() params) {
        return {
            status: HttpStatus.OK,
            data: await this.service.getUser(params.id),
        }
    }
    @Delete(':id/delete')
    async deleteUser(@Param() params) {
        return {
            message: 'User deleted successfully',
            data: await this.service.removeUser(params.id)
        }
    }
    @Put(':id/update')
    async updateUser(@Param('id') id , @Body() user: User) {
         await this.service.updateUser(id,user)
        return {
            message: 'User Updated Successfully'
        }
    }

}