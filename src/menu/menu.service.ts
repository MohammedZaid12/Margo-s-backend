import { MenuChildDto } from './MenuChildDto';
import { MenuParentDto } from './MenuParentDto';
import { Menu } from './menu.entit';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  // const concat = "PO"+user.id;
  // user.phoneNumber = concat;
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  getMenuById(id: number) {
    return this.menuRepository.find({
      where: [{ id: id }],
    });
  }

  findAll() {
    return this.menuRepository.find();
  }

  async updateMenuParent(id: number, menu: MenuParentDto) {
    return await this.menuRepository.update(id, menu);
  }

  async addMenuParent(data: MenuParentDto) {
    var count = await this.menuRepository.count();
    count++;
    const menu = this.menuRepository.create(data);
    var menuParentItem = 'PO' + count;
    menu.code = menuParentItem;
    menu.isParent = 1;
    if(this.menuRepository.save(menu)){
        return{
            message : "Menu Item added Successfully"
        }
    }
    else{
        return{
            message : "Error while adding item"
        }
    }
  }

  removeMenuParent(id: number) {
    this.menuRepository.delete(id);
  }

  async updateMenuChild(id: number, menu: MenuChildDto) {
    return await this.menuRepository.update(id, menu);
  }

  async addMenuChild(data: MenuChildDto) {
    var count = await this.menuRepository.count();
    count++;
    const menu = this.menuRepository.create(data);
    var menuChildItem = 'CO' + count;
    menu.code = menuChildItem;
    menu.isParent = 0;
    if(this.menuRepository.save(menu)){
        return{
            message : "Menu Item added Successfully"
        }
    }
    else{
        return{
            message : "Error while adding item"
        }
    }
  }

  removeMenuChild(id: number){
    this.menuRepository.delete(id);
  }

}
