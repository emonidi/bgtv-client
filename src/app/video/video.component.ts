import { Component, AfterViewInit, ViewChild, Input, ElementRef, OnChanges, OnInit } from '@angular/core';
import { NgCastService } from 'ng-cast';
import { VgAPI } from 'videogular2/core';
declare var google: any;
declare var adsbygoogle: any;


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnChanges {

  @ViewChild('video') video: ElementRef;
  @Input() source: string;
  @Input() castStream: string;
  public src: any;
  videoPlayer: any;
  playerApi:any;
  startEvent: any;
  type:any = 'application/x-mpegURL';
  options: any;
  private adsLoader: any;
  private isCasting:boolean = false;
  constructor(private ngCastService:NgCastService) { }

  ngOnInit() {
    //this.initAdContainer();
    (adsbygoogle = (window as any).adsbygoogle || []).push({});
  }

  play(ev){
    //this.video.nativeElement.play();
  }

  onPlayerReady(player){
    this.playerApi = player;
  }

  onCastButtonClick(){
    this.ngCastService.initializeCastApi();
    let interval = setInterval(()=>{
     
      if(this.ngCastService.getStatus().casting){
        this.ngCastService.launchMedia(this.castStream);
        // this.api.pause();
        clearInterval(interval);
        console.log('casting interval')
      }
    },500)

    window.onbeforeunload = ()=>this.ngCastService.stop();

  }

  ngOnChanges(change: any) {

    if (change.source && change.source.currentValue) {
      this.src = change.source.currentValue;
      this.type = 'application/x-mpegURL';
      
    }
  }

  initAdContainer() {
    let adsManager;
    var videoContent = this.video.nativeElement;
    var adDisplayContainer =
      new google.ima.AdDisplayContainer(
        document.getElementById('adContainer'),
        videoContent);
    // Must be done as the result of a user action on mobile
    adDisplayContainer.initialize();

    var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    // Add event listeners
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded,
      false);
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false);

    function onAdError(adErrorEvent) {
      // Handle the error logging and destroy the AdsManager
      console.log(adErrorEvent.getError());
      //adsManager.destroy();
    }

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.
    var contentEndedListener = function () { adsLoader.contentComplete(); };
    videoContent.onended = contentEndedListener;

    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = 640;
    adsRequest.linearAdSlotHeight = 400;
    adsRequest.nonLinearAdSlotWidth = 640;
    adsRequest.nonLinearAdSlotHeight = 150;

    var playButton = document.querySelector('.vg-overlay-play');
    playButton.addEventListener('click', requestAds);

    function requestAds() {
      adsLoader.requestAds(adsRequest);
    }

    function onAdsManagerLoaded(adsManagerLoadedEvent) {
      // Get the ads manager.
      adsManager = adsManagerLoadedEvent.getAdsManager(
        videoContent);  // See API reference for contentPlayback

      // Add listeners to the required events.
      adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
      adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
      adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);

      try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager. init(videoContent.clientWidth, videoContent.clientHeight, google.ima.ViewMode.NORMAL);
        // Call start to show ads. Single video and overlay ads will
        // start at this time; this call will be ignored for ad rules, as ad rules
        // ads start when the adsManager is initialized.
        adsManager.start();
      } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
      }
    }

    function onContentPauseRequested() {
      // This function is where you should setup UI for showing ads (e.g.
      // display ad timer countdown, disable seeking, etc.)
      videoContent.removeEventListener('ended', contentEndedListener);
      videoContent.pause();
    }

    function onContentResumeRequested() {
      // This function is where you should ensure that your UI is ready
      // to play content.
      videoContent.addEventListener('ended', contentEndedListener);
      videoContent.play();
    }
  }

  onAdsManagerLoaded() {

  }

  onAdError(adErrorEvent: any) {
    console.log(adErrorEvent.getError());
    // this.adsManager.destroy();
  }

}
