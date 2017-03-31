import { Component, ViewEncapsulation, OnChanges, OnInit,NgZone } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class AppComponent implements OnInit{
  innerWidth = window.innerWidth;

  constructor(private router: Router, private zone: NgZone){}

  ngOnInit(){
    this.router.events
    .filter((event: any)=>{
      return event instanceof NavigationStart
    })
    .subscribe((change)=>{
       this.zone.run(()=>{});
    })
  }
}
