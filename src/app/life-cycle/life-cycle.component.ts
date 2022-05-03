import {AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css']
})
export class LifeCycleComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild('wrapper') wrapper!:ElementRef;
  @ContentChild('myContent') content!:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit - wrapper', this.wrapper);
    console.log('ngAfterContentInit - content', this.content);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit - wrapper', this.wrapper);
    console.log('ngAfterViewInit - content', this.content);
  }
}
