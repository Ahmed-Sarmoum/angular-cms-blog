import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'projects/models/category.interface';
import { Post } from 'projects/models/post.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  subs$ = new Subject() 

  constructor(private apiService: ApiService,
                      private router: Router,
                      private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.subs$)
    ).subscribe(params => {

      const catTitle = params.get('title')

      if (this.router.url === `/post/category/${catTitle}`) {
        
        this.apiService.getAllPost().pipe(
          map(posts => posts.filter(p => p.category.title === catTitle)),
          takeUntil(this.subs$)
        ).subscribe(posts => this.posts = posts)

      } else {

        this.apiService.getAllPost().pipe(
          takeUntil(this.subs$)
        ).subscribe(res => this.posts = res)

      }
    })
 
    
  }
  ngOnDestroy() {
    //@ts-ignore
    this.subs$.next()
    this.subs$.complete()
  }



}
