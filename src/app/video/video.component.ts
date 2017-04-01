import { Component, AfterViewInit, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
declare var videojs: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements AfterViewInit, OnChanges {

  @ViewChild('video') video: ElementRef;
  @Input() source: string;
  public src:any;
  videoPlayer:any;
  constructor() { }

  ngAfterViewInit() {
     this.videoPlayer = videojs(this.video.nativeElement);
  }

  ngOnChanges(change:any){
    if(change.source && change.source.currentValue){
      console.log(this.videoPlayer);
      this.videoPlayer.src({
        src:change.source.currentValue,
        type: 'application/x-mpegURL',
        withCredentials:true
      });
    }
  }

}
