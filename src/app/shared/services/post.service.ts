import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {POSTS} from '../mock-data';
import {PostI} from '../interfaces/post.interface';
import {CommentService} from './comment.service';
import {CommentI} from '../interfaces/comment.interface';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: PostI[] = POSTS;
  $posts = new BehaviorSubject<PostI[]>(POSTS);

  constructor(private commentService: CommentService) {
  }

  getPosts(): Observable<PostI[]> {
    return this.$posts.asObservable();
  }

  addPost(post: PostI): void {
    this.posts.push(post);

    this.$posts.next(this.posts);
  }

  getPostComments(postId: number): Observable<CommentI[]> {
    return this.commentService.getComments().pipe(map(comments => {
      return comments.filter(comment => comment.postId === postId);
    }));
  }
}
