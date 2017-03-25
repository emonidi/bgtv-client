import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  private category:string;
  private televisions:Array<any>;

  constructor(private route:ActivatedRoute, private http:Http) {
    this.category=this.route.snapshot.params['category'];
  }

  ngOnInit(){
    this.http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.bg-gledai.tv%2F"+this.category+"'%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22content%22%5D%2Fdiv%5B%40class%3D%22gallerybox%22%5D%2Fa'&format=json&diagnostics=true&callback=")
    .map(res=>res.json().query.results.a)
    .subscribe(res=>{
      this.televisions = res.map(item=>{
        return Object.assign(item,{href:item.href.split("http://www.bg-gledai.tv/")[1]})
      });
      console.log(this.televisions);
    })
  }

}
