import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  TrackByFunction,
  ViewChild
} from '@angular/core';
import {PostService} from "../post.service";
import {dragula, DragulaService} from "ng2-dragula";
// @ts-ignore
import autoScroll from 'dom-autoscroller';
import {Subscription} from "rxjs";
import {DrakeWithModels} from "ng2-dragula/dist/DrakeWithModels";

export interface Post {
  id: number,
  name: string,
  children?: Array<Post>
}

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  public DRAGULA_GROUP = "MY_GROUP";
  private drake!: DrakeWithModels;

  constructor(
    private postService: PostService,
    private dragula: DragulaService
  ) { }



  public posts: Array<Post> = new Array<Post>();

  private dragAndDropSubscription!: Subscription;

  ngOnInit(): void {
    this.postService.fetchData().then((posts) => {
      this.posts = posts
    });

    this.drake = this.dragula.createGroup(this.DRAGULA_GROUP, {
      // el - html элемент который мы двигаем, target- html контейнер куда мы переносим элемент, source - html контейнер откуда мы выносим элемент
      // Даем разрешение на перестановку если контейнер откуда берем элемент совпадает с контейнером куда кладем
      accepts:  (el, target, source) => target?.id === source?.id,
    }).drake;

    this.dragAndDropSubscription = this.dragula.dropModel(this.DRAGULA_GROUP).subscribe((data) => {
      console.log("Changing data order", data);
    });


  }

  public trackByPostId: TrackByFunction<Post> = (index, post) => {
    return post.id
  }

  ngAfterViewInit(): void {
    // const drake = this.dragula.find(this.DRAGULA_GROUP).drake
    // const drake = this.drake

    // autoScroll(
    //   this.drake.containers,
    //   {
    //     margin: 30,
    //     maxSpeed: 25,
    //     scrollWhenOutside: true,
    //     autoScroll: function () {
    //       // if (this.down) console.log("Step1")
    //       // if (drake.dragging) console.log("Step2")
    //       return this.down && drake.dragging
    //     }
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.dragAndDropSubscription.unsubscribe();
    this.dragula.destroy(this.DRAGULA_GROUP);
  }
}
