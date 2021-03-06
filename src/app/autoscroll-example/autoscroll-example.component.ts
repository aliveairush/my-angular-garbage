import {Component, ElementRef, OnDestroy, OnInit, TrackByFunction, ViewChild} from '@angular/core';
import {DrakeWithModels} from "ng2-dragula/dist/DrakeWithModels";
import {PostService} from "../post.service";
import {DragulaService} from "ng2-dragula";
import {Subscription} from "rxjs";
import {Post} from "../posts-form/posts-form.component";

@Component({
  selector: 'app-autoscroll-example',
  templateUrl: './autoscroll-example.component.html',
  styleUrls: ['./autoscroll-example.component.css']
})
export class AutoscrollExampleComponent implements OnInit , OnDestroy{
  public DRAGULA_GROUP = "MY_GROUP";
  private drake!: DrakeWithModels;

  constructor(
    private postService: PostService,
    private dragula: DragulaService
  ) { }




  public posts: Array<Post> = new Array<Post>();

  private dragAndDropSubscription!: Subscription;
  private dragStartSubscription!: Subscription;
  private dragEndSubscription!: Subscription;

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


    // Когда перетаскиваем элемент добавляем listener,
    // чтобы если курсор мыши выходит за границы контейнера, то скролить
    this.dragStartSubscription = this.dragula.drag(this.DRAGULA_GROUP)
      .subscribe(() => {
        document.addEventListener('mousemove', this.handleMouseMoveFaqList);
      });

    // Когда перетаскивание прекратилось удаляем listener
    this.dragEndSubscription = this.dragula.dragend(this.DRAGULA_GROUP).subscribe(() => {
      this.stopScrolling();
      document.removeEventListener('mousemove', this.handleMouseMoveFaqList);
    });
  }

  ngOnDestroy(): void {
    this.stopScrolling();
    this.dragAndDropSubscription.unsubscribe();
    this.dragStartSubscription.unsubscribe();
    this.dragEndSubscription.unsubscribe();
  }

  public trackByPostId: TrackByFunction<Post> = (index, post) => {
    return post.id
  }

  // => CODE  FOR AUTO-SCROLLING =>
  @ViewChild('listContainer')
  listContainer!: ElementRef;

  private DRAG_SCROLL_DISTANCE = 20;

  private scrollingAnimation!: number | null;

  // 1  = scroll down, -1  = scroll top
  private scrollDirection: 1 | -1  = 1;

  /*  Функция высчитывает наименьшее и наибольшее значение Y у контейнера (faq list)
    Если позиции мыши по Y меньше наименьшей позиции Y контейнера, то выполняем scroll наверх.
    Если позиции мыши по Y больше наибольшей позиции Y контейнера, то выполняем scroll вниз.
    Если позиции мыши по Y входит в контейнер, то останавливаем scroll. */
  private handleMouseMoveFaqList = (e: MouseEvent) =>  {
    const offsetTop = this.listContainer.nativeElement.offsetTop;
    const offsetHeight = this.listContainer.nativeElement.offsetHeight;

    // -1 пиксель нужен чтобы скролилось и в полноэкранном режиме
    const isCursorBelowContainer = e.pageY >= offsetTop + offsetHeight - 1;
    const isCursorAboveContainer = e.pageY < offsetTop;
    const isCursorInContainer = !isCursorAboveContainer && !isCursorBelowContainer;

    // Если происходит scroll и курсор в рамках контейнера, то остановка scroll
    if (this.scrollingAnimation && isCursorInContainer) {
      this.stopScrolling();
    } else if ( isCursorAboveContainer || isCursorBelowContainer ) {
      if (!this.scrollingAnimation) { // Если нет анимации значит нужно навесить
        // Если курсор выше контейнера -1 иначе ниже контейнера значит 1
        this.scrollDirection = isCursorAboveContainer ? -1 : 1;
        this.scrollingAnimation = requestAnimationFrame(this.scrollFaqList);
      }
    }
  }

  private scrollFaqList = () =>  {
    this.listContainer.nativeElement.scrollBy({ top: this.scrollDirection * this.DRAG_SCROLL_DISTANCE });
    this.scrollingAnimation = requestAnimationFrame(this.scrollFaqList);
  }

  private stopScrolling() {
    cancelAnimationFrame(this.scrollingAnimation as number);
    this.scrollingAnimation = null;
  }
  /* <= CODE FOR AUTO-SCROLLING <=  */
}
