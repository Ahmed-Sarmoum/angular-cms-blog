import { Component, OnInit } from '@angular/core';
import { Category } from 'projects/models/category.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  cats: Category[] = []
  subs$ = new Subject() 

  constructor(private readonly apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getAllCategories().pipe(
      takeUntil(this.subs$)
    ).subscribe(res => this.cats = res.filter(c => c.title !== 'Uncategorized'))
  }
  
  ngOnDestroy() {
    //@ts-ignore
    this.subs$.next()
    this.subs$.complete()
  }
}
