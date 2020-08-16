import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private counterService: CounterService
  ) { }

  ngOnInit(): void { }

  get toInactiveCount(): number {
    return this.counterService.toInactiveCount;
  }

  get toActiveCount(): number {
    return this.counterService.toActiveCount;
  }

  get activeUsers(): string [] {
    return this.usersService.activeUsers;
  }

  get inactiveUsers(): string [] {
    return this.usersService.inactiveUsers;
  }
}
