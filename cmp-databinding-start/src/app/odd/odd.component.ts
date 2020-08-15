import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  // styleUrls: ['./odd.component.css']
  styles: [
    `
      p {
        color: deepskyblue;
      }
    `
  ]
})
export class OddComponent implements OnInit {
  @Input()
  number = [];

  constructor() { }

  ngOnInit(): void {
  }
}
