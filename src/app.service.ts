import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getName(): {name:string} {
    return {name:'Zaid Jaffar Moosa'};
  }
}
