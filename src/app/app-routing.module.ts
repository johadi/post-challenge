import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {CommentsComponent} from './pages/comments/comments.component';

const routes: Routes = [
  {path: 'posts', component: PostsComponent},
  {path: 'comments/:userId', component: CommentsComponent},
  {path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
