import { User } from './users/user.entit';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: 'app.development.env',
      ignoreEnvFile: true,
      isGlobal: true,
    })
  ],
  controllers: [AppController, MenuController],
  providers: [AppService, MenuService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
