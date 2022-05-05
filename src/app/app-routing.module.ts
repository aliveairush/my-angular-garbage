import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostsFormComponent} from "./posts-form/posts-form.component";
import {LifeCycleComponent} from "./life-cycle/life-cycle.component";
import {AutoscrollExampleComponent} from "./autoscroll-example/autoscroll-example.component";

const routes: Routes = [
  {path: 'posts', component: PostsFormComponent},
  {path: 'autoscroll', component: AutoscrollExampleComponent},
  {path: 'lifecycle', component: LifeCycleComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
