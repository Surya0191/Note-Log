import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NotesLogService } from '../shared/notes-log.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: string;
  @Output('delete') deleteEvent = new Subject<void>;
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

  onDelete(){
    this.deleteEvent.next();
  }
}
