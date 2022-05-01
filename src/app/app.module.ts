import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DragulaModule} from "ng2-dragula";
import { PostsFormComponent } from './posts-form/posts-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsFormComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
