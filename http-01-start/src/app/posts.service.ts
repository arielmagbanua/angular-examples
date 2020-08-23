import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
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
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe((responseData) => {
        console.log(responseData.body);
      }, (error) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('foo', 'bar');
    return this.http.get<{ [key: string]: Post }>(
      'https://udemy-training-af9d1.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        params: searchParams
      }
    )
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
    return this.http.delete(
      'https://udemy-training-af9d1.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    ).pipe(tap((event) => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        // ... You can update the UI here
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
