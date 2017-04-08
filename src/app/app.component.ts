import { Component, ViewEncapsulation, OnChanges, OnInit,NgZone, ViewChild } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import { MdButton } from '@angular2-material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class AppComponent implements OnInit{
  innerWidth = window.innerWidth;
  opened:boolean=false;
  @ViewChild('ng2adsense') ng2adsense: ViewChild;
  constructor(private router: Router, private zone: NgZone){}

  ngOnInit(){
    // this.router.events
    // .filter((event: any)=>{
    //   return event instanceof NavigationStart
    // })
    // .subscribe((change)=>{
    //    this.zone.runOutsideAngular(()=>{
    //     (this.ng2adsense as any).push({});
    //    });
    // })
  }

  toggleMenu(){
    this.opened = !this.opened;
  }
}
