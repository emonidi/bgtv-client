import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryScraperServiceService } from '../category-scraper-service.service';
import { NgCastService } from 'ng-cast';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css'],
    providers:[CategoryScraperServiceService],

})
export class ChannelListComponent implements OnInit {

private categories:any;
  private showChannels:boolean;
 innerWidth = window.innerWidth;
  constructor(private categoryScraper: CategoryScraperServiceService, private ngCastService: NgCastService, private elRef: ElementRef) {
    this.categoryScraper.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    window.onbeforeunload = () => {
      this.ngCastService['cast'].castSession.addUpdateListener();
    };
  }

  ngOnInit() {
    this.setLayout();
    window.onresize = () => {
      this.setLayout();
    };
  }


  setLayout(){
    const list = this.elRef.nativeElement.querySelector('md-list');

      if(window.innerWidth < 768) {
        list.style.height = 'calc(100vh - ' + (list.offsetTop) + 'px)';
        list.style.overflow = 'scroll';
      }
  }

}
