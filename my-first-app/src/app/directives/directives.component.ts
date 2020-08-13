import { Component, OnInit } from '@angular/core';
import {timestamp} from 'rxjs/operators';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {
  showTwinkle = true;
  buttonClickLogs = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowTwinkle(): void {
    this.buttonClickLogs.push(`Button clicked at ${Date().toString()}`);
    this.showTwinkle = !this.showTwinkle;
  }
}
