import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {NgCastService} from 'ng-cast';
declare var Hls:any;
declare var cast:any;
declare var chrome:any;

@Component({
  selector: 'app-watch-component',
  templateUrl: './watch-component.component.html',
  styleUrls: ['./watch-component.component.css'],
})
export class WatchComponentComponent{

  private headers:Headers;
  private tvLink:string;

  constructor(private route:ActivatedRoute, private http:Http, private element:ElementRef, private ngCastService:NgCastService) {
    this.route.params.subscribe(params=>{
      this.headers = params['tv'];
      this.getScript(params['tv']);
    })
  }

  getScript(link:string){
    console.log(link);
    let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.seirsanduk.com/"+link+"'%20and%20xpath%3D'.%2F%2Fscript'&format=json&callback="
    this.http.get(url)
    .map(res=>res.json().query.results.script)
    .subscribe(res=>{
      this.tvLink = res.filter(item=>{
        if(item.content && item.content.indexOf('jwplayer("Element")') > 0){
          return item;
        }
      })[0].content.split("file:")[1].split(",")[0].replace(/\"/ig,'');

      if(this.ngCastService.getStatus().casting){
        this.ngCastService.launchMedia(this.tvLink);
      }else{
        alert("Устройството свързано ли е?")
      }
      

    });
  }


  stop(){
    this.ngCastService.stop();
  }


  playVideo(url:string){

    if (Hls.isSupported()) {
      var video = document.getElementById('video');
      var hls = new Hls();
      // bind them together
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log(url)
        console.log("video and hls.js are now bound together !");
        hls.loadSource(url);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log("manifest loaded, found " + data.levels.length + " quality level");
        });

      });
    }

  }




}
