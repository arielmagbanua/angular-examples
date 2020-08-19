import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    const ops = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    }));

    this.firstObsSubscription = ops.subscribe((data) => {
      console.log(data);
    }, (err: Error) => {
      console.log(err.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
