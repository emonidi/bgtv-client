import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ChromeCastService {
  public connectedwithClient:boolean;
  public initialized:boolean = false;
  private cast;
 castInstance;
  private chrome;
  private session;
  public sessionState;
  constructor() {
    if(!window['cast']){
       this.initialize();
    }else{
       this.onInitialize(this.initialized);
    }
  }

  onInitialize(initialized:boolean){

  }

  initialize(){
    this.appendLink().subscribe(()=>{
      window['__onGCastApiAvailable'] = (available) => {
      this.cast = window['cast'];
      this.chrome = window['chrome'];
     this.initialized = available; 
      this.onInitialize(this.initialized);
      this.setOptions()};
    });
  }

  setOptions(){
    this.cast.framework.CastContext.getInstance().setOptions({
       receiverApplicationId: this.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
       autoJoinPolicy: window['chrome'].cast.AutoJoinPolicy.PAGE_SCOPED
    });
  }

 
  connectWithClient(){
    let subject = new Subject();
    console.log(this.chrome);
    this.chrome.cast.requestSession((session)=>{
      this.session = session;
    })
  }

  appendLink(){
    let subject= new Subject();
    let script = document.createElement('script');
    script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
    document.head.appendChild(script);
    script.onload = ()=>{
      subject.next();
    }
    return subject;
  }

}
