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
    return this.http.get('https://bgtvbackend-airpong.rhcloud.com/stations').map((res)=>res.json());
  }

}