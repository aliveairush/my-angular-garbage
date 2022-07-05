import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

const tooltipContainerCss = `
  position: absolute;
  background-color: white;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 8px 8px rgb(0 0 0 / 8%);
  max-width: 360px;
  border-radius: 8px;
  transform: translate(-50%, -100%);
`;

const tooltipTextContainerCss = `
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  font-family: 'Arial';
`;

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip = ''; // The text for the tooltip to display
  @Input() delay? = 190; // Optional delay input, in ms

  private myPopup: any;
  private timer: any;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnDestroy(): void {
    if (this.myPopup) { this.myPopup.remove() }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      let x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      let y = this.el.nativeElement.getBoundingClientRect().top - 4; // Get the top of the element, plus a little less
      this.createTooltipPopup(x, y);
    }, this.delay)
  }

  @HostListener('mouseleave') onMouseLeave() {
    // if (this.timer) clearTimeout(this.timer);
    // if (this.myPopup) { this.myPopup.remove() }
  }

  private createTooltipPopup(x: number, y: number) {
    const tooltipContainerEl = document.createElement('div');
    tooltipContainerEl.style.cssText = tooltipContainerCss;

    tooltipContainerEl.style.top = y.toString() + "px";
    tooltipContainerEl.style.left = x.toString() + "px";

    const tooltipTextContainer = document.createElement('div');

    tooltipTextContainer.innerText = this.appTooltip;
    tooltipTextContainer.style.cssText = tooltipTextContainerCss;

    tooltipContainerEl.appendChild(tooltipTextContainer);

    document.body.appendChild(tooltipContainerEl);
    this.myPopup = tooltipContainerEl;
  }
}
