import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  // styleUrls: ['./even.component.css']
  styles: [
    `
      p {
        color: blue;
      }
    `
  ]
})
export class EvenComponent implements OnInit {
  @Input()
  number = [];

  constructor() { }

  ngOnInit(): void {
  }
}
