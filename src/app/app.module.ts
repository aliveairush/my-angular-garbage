import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DragulaModule} from "ng2-dragula";
import { PostsFormComponent } from './posts-form/posts-form.component';
import {AppRoutingModule} from "./app-routing.module";
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { AutoscrollExampleComponent } from './autoscroll-example/autoscroll-example.component';
import { TooltipTestComponent } from './tooltip-test/tooltip-test.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostsFormComponent,
    LifeCycleComponent,
    AutoscrollExampleComponent,
    TooltipTestComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
