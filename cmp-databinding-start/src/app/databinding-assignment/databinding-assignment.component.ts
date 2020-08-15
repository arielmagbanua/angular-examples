import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-databinding-assignment',
  templateUrl: './databinding-assignment.component.html',
  styleUrls: ['./databinding-assignment.component.css']
})
export class DatabindingAssignmentComponent implements OnInit {
  evenNumbers = [];
  oddNumbers = [];

  constructor() { }

  ngOnInit(): void {
  }

  insertNewNumber(num: number): void {
    if (num % 2 === 0) {
      this.evenNumbers.push(num);
      return;
    }

    this.oddNumbers.push(num);
  }
}
