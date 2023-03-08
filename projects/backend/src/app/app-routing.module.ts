import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostsComponent
          },
          {
            path: 'categories',
            component: CategoryComponent
          },
          {
            path: 'create',
            component: NewPostComponent
          },
          {
            path: 'edit/:slug',
            component: EditPostComponent
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          },
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
