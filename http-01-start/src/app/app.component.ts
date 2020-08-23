import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import {PostsService} from './posts.service';
import {generateErrorMessage} from 'codelyzer/angular/styles/cssLexer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage: string) => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error) => {
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error) => {
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
