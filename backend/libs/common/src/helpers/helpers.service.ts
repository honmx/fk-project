import { Injectable } from '@nestjs/common';
import { ICoach } from '../types/ICoach';

@Injectable()
export class HelpersService {

  hash<T extends object>(obj: T): string {
    let result = "";

    for (const prop in obj) {
      result += obj[prop] + "_";
    }

    return result.slice(0, result.length - 1);
  }

  pick<T extends object>(props: (keyof T)[], obj: T): T {
    const newObj = {};
  
    for (const prop of props) {
      if (!newObj[prop as string]) {
        newObj[prop as string] = obj[prop];
      }
    }
    
    return newObj as T;
  }
}
