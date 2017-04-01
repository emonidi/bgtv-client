import { Component, AfterViewInit, ViewChild, Input, ElementRef, OnChanges, OnInit } from '@angular/core';
declare var videojs: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnChanges {

  @ViewChild('video') video: ElementRef;
  @Input() source: string;
  public src: any;
  videoPlayer: any;
  startEvent: any;
  options: any;
  constructor() { }

  ngOnInit() {
    this.videoPlayer = videojs('video', {
      html5: {
        hls: {
          withCredentials: true,
          overrideNative:true
        }
      }
    }).ready(() => {
      this.options = {
        id: 'video',
        // autoPlayAdBreaks:true,
        locale: 'bg',
        nativeControlsForTouch:false,
        adsRenderingSettings: {
          enablePreloading: true,
          playAdsAfterTime: 30,
          restoreCustomPlaybackStateOnAdBreakComplete: true
        },
        adTagUrl:   'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
      };
    })
      .on('play', () => {
        if (typeof this.videoPlayer.ima === 'object') {
          this.videoPlayer.ima.initializeAdDisplayContainer();
          this.videoPlayer.ima.requestAds();
          this.videoPlayer.play();
        } else {
          this.videoPlayer.ima(this.options);
          this.videoPlayer.ima.initializeAdDisplayContainer();
          this.videoPlayer.ima.requestAds();
          this.videoPlayer.play();
        }
         
      });


      this.videoPlayer.on('adserror',(err)=>{
        console.log(err.data.AdError);
        // alert(err.data.AdError);
      });


  }

  ngOnChanges(change: any) {

    if (change.source && change.source.currentValue) {

      // this.videoPlayer.destroy();

      this.videoPlayer.src({
        src: change.source.currentValue,
        type: 'application/x-mpegURL',
        withCredentials: true
      })

    }
  }

}
