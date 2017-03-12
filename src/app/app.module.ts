
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Params } from '@angular/router';
import { NgCastModule } from 'ng-cast';
import {NgForm  } from '@angular/forms';
import { AppComponent } from './app.component';
import { WatchComponentComponent } from './watch-component/watch-component.component';
import { CategoriesComponent } from './categories/categories.component';
import {MdIconModule, MdIconRegistry} from '@angular2-material/icon';
import {MdButtonModule} from '@angular2-material/button'


const routes:Routes = <Routes>[
  {path: 'watch/:tv', component: WatchComponentComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    WatchComponentComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdIconModule,
    NgCastModule,
    MdButtonModule,
      RouterModule.forRoot(routes)
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
