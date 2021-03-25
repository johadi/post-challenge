import { Injectable } from '@angular/core';
import {COMMENTS} from '../mock-data';
import {CommentI} from '../interfaces/comment.interface';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: CommentI[] = COMMENTS;
  $comment = new BehaviorSubject<CommentI[]>(COMMENTS);

  constructor() { }

  getCommentsByUser(userId: number): CommentI[] {
    return this.comments.filter(comment => comment.userId === userId);
  }

  setComment(comment: Partial<CommentI>): void {
    comment.id = this.comments.length;
    comment.date = new Date();

    this.comments.push(comment as CommentI);
    this.$comment.next(this.comments);
  }

  getComments(): Observable<CommentI[]> {
    return this.$comment.asObservable();
  }
}
