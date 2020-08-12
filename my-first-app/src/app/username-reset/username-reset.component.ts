import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username-reset',
  templateUrl: './username-reset.component.html',
  styleUrls: ['./username-reset.component.css']
})
export class UsernameResetComponent implements OnInit {
  username = '';

  constructor() { }

  ngOnInit(): void {
  }

  resetUsername(): void {
    this.username = '';
  }
}
