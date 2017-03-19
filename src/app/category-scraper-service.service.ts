import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryScraperServiceService {

  private categories:Array<any>;

  constructor(private http:Http) {

  }

  getCategories(){
    // return new Observable((observer)=>{
    //   if(!this.categories || this.categories.length === 0){
    //     this.http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.seirsanduk.com%2F'%20and%20xpath%3D'.%2F%2Ful%5B%40class%3D%22nav_vodlist%22%5D%2Fli%2Fa'&format=json&callback=")
    //       .map(res=>{
    //         let json =res.json().query.results.a;
    //         console.log(json);
    //         return json;
    //       })
    //       .subscribe(res=>{
    //         observer.next(res);
    //         this.categories = res;
    //       });
    //   }
    //   observer.next(this.categories);
    // })
    return this.http.get('http://bgtvbackend-airpong.rhcloud.com/stations').map((res)=>res.json());
  }

}