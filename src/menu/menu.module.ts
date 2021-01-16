import { Menu } from './menu.entit';
import { MenuService } from './menu.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  exports: [TypeOrmModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
