import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  private count = 0;
  private countInterval;

  @Output()
  currentCount = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  startCount(): void {
    this.countInterval = setInterval(() => {
      // emit the latest count
      this.currentCount.emit(++this.count);
    }, 1000);
  }

  stopCount(): void {
    clearInterval(this.countInterval);
  }
}
