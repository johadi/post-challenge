import {Injectable} from '@angular/core';
import {USERS} from '../mock-data';
import {UserI} from '../interfaces/user.interface';
import {PostService} from './post.service';
import {CommentService} from './comment.service';
import {Observable} from 'rxjs';
import {CommentI} from '../interfaces/comment.interface';
import {map} from 'rxjs/operators';
import {PostI} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserI[] = USERS;

  constructor(private postService: PostService, private commentService: CommentService) {
  }

  getUser(userId: number): UserI {
    return this.users.find(user => user.id === userId) as UserI;
  }

  getUserComments(userId: number): Observable<number> {
    return this.commentService.getComments().pipe(map(comments => {
      return comments.filter(comment => comment.userId === userId).length;
    }));
  }

  getUserLikes(userId: number): Observable<number> {
    return this.postService.getPosts().pipe(map(posts => {
      const userPosts = posts.filter(post => post.userId === userId);

      return userPosts.reduce((acc, item) => {
        let total = acc;
        if (item.likes && item.likes.length > 0) {
          total += item.likes.length;
        }
        return total;
      }, 0);
    }));
  }
}
