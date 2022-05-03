import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostsFormComponent} from "./posts-form/posts-form.component";

const routes: Routes = [
  {path: 'posts', component: PostsFormComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
