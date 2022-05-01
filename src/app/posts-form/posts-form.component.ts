import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import { DragulaService} from "ng2-dragula";
// @ts-ignore
import autoScroll from 'dom-autoscroller';
import {Subscription} from "rxjs";

export interface Post {
  name: string,
  children?: Array<Post>
}

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent implements OnInit, AfterViewInit {

  public GROUP_NAME = "MY_GROUP"

  constructor(private postService: PostService, private dragula: DragulaService) { }

  public posts: Array<Post> = new Array<Post>();

  private dragAndDropSubscription!: Subscription;


  @ViewChild('myel')
  elem!: ElementRef<HTMLElement>


  ngOnInit(): void {
    this.postService.fetchData().then((posts) => {
      this.posts = posts
    });

    this.dragula.createGroup(this.GROUP_NAME, {
      // Проверка можем ли мы дропнуть элемент
      // el - элемент который мы двигаем, target- контейнер куда мы переносим элемент, source - контейнер откуда мы выносим элемент
      accepts:  (el, target, source) => target?.id === source?.id,
    })

    this.dragAndDropSubscription = this.dragula.dropModel(this.GROUP_NAME).subscribe((data) => {
      console.log("Changing data order", data);
    })

  }

  ngAfterViewInit(): void {
    const drake = this.dragula.find(this.GROUP_NAME).drake

    console.log("drace", drake.containers);
    autoScroll(
      drake.containers,
      // this.elem.nativeElement,
      {
        margin: 30,
        maxSpeed: 25,
        scrollWhenOutside: true,
        autoScroll: function () {
          // if (this.down) console.log("Step1")
          // if (drake.dragging) console.log("Step2")
          return this.down && drake.dragging
        }
      }
    );
  }

  // TODO dont forget to destroy scroll on ngOnDestroy
}
