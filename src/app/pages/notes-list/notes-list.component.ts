import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Optional } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesLogService } from 'src/app/shared/notes-log.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //Entry point for animation
      transition('void=>*', [
        //Initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': '0',
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(100),
      ]),
      transition('*=>void', [
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        animate(
          '150ms ease-out',
          style({
            height: 0,
            opacity: 0,
            'margin-bottom': '0',
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),

    trigger('listAnim',[
      transition('*=>*', [
        query(':enter', [
          style({
            opacity: 0,
            height:0,
            }),
            stagger(100,[
              animate('0.2s ease')
            ])
      ],{ optional: true })
    ])
    ])]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();

  constructor(private notesLogService: NotesLogService) {}

  ngOnInit(): void {
    this.notes = this.notesLogService.getAll();
  }

  onDeleteNote(index: number) {
    this.notesLogService.delete(index);
  }
}
