import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

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
      }));
  }

  deletePosts() {
    return this.http.delete('https://udemy-training-af9d1.firebaseio.com/posts.json');
  }
}
