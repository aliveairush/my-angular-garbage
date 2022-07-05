import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostsFormComponent} from "./posts-form/posts-form.component";
import {LifeCycleComponent} from "./life-cycle/life-cycle.component";
import {AutoscrollExampleComponent} from "./autoscroll-example/autoscroll-example.component";
import {TooltipTestComponent} from "./tooltip-test/tooltip-test.component";

const routes: Routes = [
  {path: 'posts', component: PostsFormComponent},
  {path: 'autoscroll', component: AutoscrollExampleComponent},
  {path: 'lifecycle', component: LifeCycleComponent},
  {path: 'tooltip', component: TooltipTestComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
