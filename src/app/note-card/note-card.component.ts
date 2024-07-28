import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements AfterViewInit {
  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let bodyTextStyle = window.getComputedStyle(
      this.bodyText.nativeElement,
      null
    ); 
    let viewableBodyHeight = parseInt(
      bodyTextStyle.getPropertyValue('height'),
      10
    );
    let scrollHeight = this.bodyText.nativeElement.scrollHeight;
    if (scrollHeight > viewableBodyHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
}
