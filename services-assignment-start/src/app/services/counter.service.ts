import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  toInactiveCount = 0;
  toActiveCount = 0;

  constructor(private usersService: UsersService) {
    this.usersService.actionEmitter.subscribe((type: string) => {
      if (type === 'to_inactive') {
        return ++this.toInactiveCount;
      }

      return ++this.toActiveCount;
    });
  }
}
