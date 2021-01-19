import { MenuChildDto } from './MenuChildDto';
import { MenuParentDto } from './MenuParentDto';
import { MenuService } from './menu.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) {}
@UseGuards(AuthGuard('jwt'))
  @Post('addMenuSection')
  public addMenuSection(@Body() menu: MenuParentDto) {
    this.service.addMenuParent(menu);
    return{
      message : "Menu Section added Successfully"
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('addMenuSectionItems')
  public addMenuSectionItems(@Body() menu: MenuChildDto) {
    this.service.addMenuChild(menu);
    return{
      message : "Menu Section Item added Successfully"
    }
  }

  @Get('')
   getAllMenu() {
    return this.service.findAll();
    
  }
@UseGuards(AuthGuard('jwt'))
  @Delete(':id/deleteParent')
  deleteMenuParent(@Param() params) {
    this.service.removeMenuParent(params.id);
    return {
      message: 'Menu Section deleted successfully',
    };
  }
@UseGuards(AuthGuard('jwt'))
  @Put(':id/updateParent')
  updateMenuParent(@Param('id') id, @Body() menu: MenuParentDto) {
    this.service.updateMenuParent(id, menu);
    return {
      message: 'Menu Section Updated Successfully',
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/deleteChild')
  deleteMenuChild(@Param() params) {
    this.service.removeMenuChild(params.id);
    return {
      message: 'Menu Section Items deleted successfully',
    };
  }
@UseGuards(AuthGuard('jwt'))
  @Put(':id/updateChild')
  updateMenuChild(@Param('id') id, @Body() menu: MenuChildDto) {
    this.service.updateMenuChild(id, menu);
    return {
      message: 'Menu Section Item Updated Successfully',
    };
  }
}
