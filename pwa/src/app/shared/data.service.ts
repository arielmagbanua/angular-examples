import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDetails() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('data');
      }, 1500);
    });
  }
}
