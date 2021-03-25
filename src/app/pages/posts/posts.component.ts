import {Component, OnInit} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {PostI} from '../../shared/interfaces/post.interface';
import {CommentI} from '../../shared/interfaces/comment.interface';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CommentService} from '../../shared/services/comment.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.commentForm = this.formBuilder.group({
      comments: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.addCommentForm();
  }

  addCommentForm(): void {
    this.posts.forEach(post => {
      const control = this.formBuilder.group({
        text: ['', [Validators.required]],
        postId: [post.id],
        userId: [post.userId]
      }, {updateOn: 'blur'});

      control.statusChanges
        .subscribe((status) => {
          if (status === 'VALID') {
            this.commentService.setComment(control.value);
          }
        });

      (this.commentForm.get('comments') as FormArray).push(control);
    });
  }

  get posts(): PostI[] {
    return this.postService.getPosts();
  }

  getPostComments(postId: number): Observable<CommentI[]> {
    return this.postService.getPostComments(postId);
  }

}
