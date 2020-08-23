import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };

    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://udemy-training-af9d1.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      }, (error) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://udemy-training-af9d1.firebaseio.com/posts.json')
      .pipe(map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }

        return postsArray;
      }),
        catchError((errorRes) => {
          // Send to analytic server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete('https://udemy-training-af9d1.firebaseio.com/posts.json');
  }
}
