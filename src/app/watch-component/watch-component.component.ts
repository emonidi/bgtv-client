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
  private headers:Headers;
  private currentStream:string;
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
  
  }


  onPlayerReady(api:VgAPI){
      this.api  = api;
  }

  getScript(link:string){
    console.log(window['chrome'].cast)
    console.log(link);
    // let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.seirsanduk.com/"+link+"'%20and%20xpath%3D'.%2F%2Fscript'&format=json&callback="
    // this.http.get(url)
    // .map(res=>res.json().query.results.script)
    // .subscribe(res=>{
    //   this.currentStream = 'https://cors-anywhere.herokuapp.com/'+ res.filter(item=>{
    //     if(item.content && item.content.indexOf('jwplayer("Element")') > 0){
    //       return item;
    //     }
    //   })[0].content.split("file:")[1].split(",")[0].replace(/\"/ig,'');
    //   if(this.ngCastService.getStatus().casting){
    //     this.ngCastService.launchMedia(this.currentStream);
    //   }else{
    //     this.api.play();
    //   }

    // });

    let url = "https://bgtvbackend-airpong.rhcloud.com/station?id="+link;
    this.http.get(url)
    .map(res=>res.json().url)
    .subscribe(res=>{
      console.log(res);
      this.currentStream = 'https://cors-anywhere.herokuapp.com/'+res;
      if(this.ngCastService.getStatus().casting){
        this.ngCastService.launchMedia(this.currentStream);
      }else{
        this.api.play();
      }

    });
  }

  cast(){
    this.ngCastService.initializeCastApi();
    let interval = setInterval(()=>{
      if(this.ngCastService.getStatus().casting){
        this.ngCastService.launchMedia(this.currentStream);
        this.api.pause();
        clearInterval(interval);
      }
    },500)

    window.onbeforeunload = ()=>this.ngCastService.stop();
  }

  stop(){
    this.ngCastService.stop();
  }
}
