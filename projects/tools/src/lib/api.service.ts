import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { User } from 'projects/models/user.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'projects/models/post.interface';
import { Category } from 'projects/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private URL =  'http://127.0.0.1:3000'
  private authState$ = new BehaviorSubject<Boolean>(false)
  private user: User = {
                          id: -1,
                          email: '',
                          firstname: '',
                          lastname: '',
                          profilePic: '',
                          roles: ''
                        }
  private user$ = new BehaviorSubject<User>(this.user)

  constructor(private http: HttpClient,
                      private router: Router) {
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/post`)
  } 

  getPostBySlug(slug: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/post/slug/${slug}`)
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`)
  }


}
