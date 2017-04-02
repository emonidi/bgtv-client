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
    this.videoPlayer = videojs('content_video', {
      html5: {
        hls: {
          withCredentials: true,
          overrideNative: true
        }
      }
    })

    this.options = {
      id: 'content_video',
      // autoPlayAdBreaks:true,
      locale: 'bg',
      debug: true,
      nativeControlsForTouch: false,
      adsRenderingSettings: {
        enablePreloading: true,
        playAdsAfterTime: 30,
        restoreCustomPlaybackStateOnAdBreakComplete: true
      },
      adTagUrl: 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
    };
    this.startEvent = 'click';
    if (navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) {
      this.startEvent = 'touchend';
    }




    this.videoPlayer.on('adserror', (err) => {
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
      this.videoPlayer.one(this.startEvent, function (ev) {
        ev.preventDefault();
        console.log(this.ima)
        if (typeof this.ima !== 'object') {
          this.ima({
            id: 'content_video',
            // autoPlayAdBreaks:true,
            locale: 'bg',
            debug: true,
            nativeControlsForTouch: false,
            adsRenderingSettings: {
              enablePreloading: true,
              playAdsAfterTime: 30,
              restoreCustomPlaybackStateOnAdBreakComplete: true
            },
            adTagUrl: 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
          });
          this.ima.requestAds();
          this.ima.initializeAdDisplayContainer();

          this.play();
        }else{
          this.ima.requestAds();
          this.ima.initializeAdDisplayContainer();

          this.play();
        }
      })

    }
  }

}
