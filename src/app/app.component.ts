import { Component, ViewEncapsulation, OnChanges } from '@angular/core';
import { CategoryScraperServiceService } from './category-scraper-service.service';
import { NgCastService } from 'ng-cast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CategoryScraperServiceService],
  encapsulation:ViewEncapsulation.None
})

export class AppComponent implements  OnChanges{
  title = 'app works!';

  private categories:any;
  private showChannels:boolean;

  constructor(private categoryScraper:CategoryScraperServiceService){
    this.categoryScraper.getCategories().subscribe(categories=>{
      console.log(categories);
      this.categories = categories;
    })
  }

  ngOnChanges(change:any){
    console.log(change);
  }
}
