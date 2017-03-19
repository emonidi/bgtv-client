
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

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";
import { VgStreamingModule } from "videogular2/streaming";


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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
      RouterModule.forRoot(routes)
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
