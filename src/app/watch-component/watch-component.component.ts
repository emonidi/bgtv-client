import { Component, OnInit, ElementRef, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {NgCastService} from 'ng-cast';
import { VgAPI } from 'videogular2/core';

declare var Hls:any;
declare var cast:any;
declare var chrome:any;

@Component({
  selector: 'app-watch-component',
  templateUrl: './watch-component.component.html',
  styleUrls: ['./watch-component.component.css'],
})
export class WatchComponentComponent implements OnInit{
  api:VgAPI;
  opened:boolean = false;
  innerWidth:number = window.innerWidth;
  private headers:Headers;
  private currentStream:string;
  private corsStream:string;

  @ViewChild('media') mediaElement:any;

  constructor(private route:ActivatedRoute, 
              private http:Http, 
              private element:ElementRef, 
              private ngCastService:NgCastService,
              private router: Router) {
    
    this.route.params.subscribe(params=>{
      this.headers = params['tv'];
       this.getScript(params['tv']);
    })
  }

  ngOnInit(){
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }


  onPlayerReady(api:VgAPI){
      this.api  = api;
  }

  getScript(link:string){
    let url = "https://bgtvbackend-airpong.rhcloud.com/station?id="+link;
    this.http.get(url)
    .map(res=>res.json().url)
    .subscribe(res=>{
      this.corsStream = 'https://cors-airpong.rhcloud.com/'+res;
      this.currentStream = res;
      if(this.ngCastService.getStatus().casting){
        this.ngCastService.launchMedia(this.currentStream);
      }else{
        //  this.api.play();
      }

    });
  }

  cast(){
    // this.ngCastService.initializeCastApi();
    // let interval = setInterval(()=>{
    //   if(this.ngCastService.getStatus().casting){
    //     this.ngCastService.launchMedia(this.currentStream);
    //     this.api.pause();
    //     clearInterval(interval);
    //   }
    // },500)

    // window.onbeforeunload = ()=>this.ngCastService.stop();
  }

  stop(){
    this.ngCastService.stop();
  }
}
