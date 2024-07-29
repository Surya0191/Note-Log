import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesLogService } from 'src/app/shared/notes-log.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note!: Note;
  noteLogId!: number;
  isNewNote!: boolean;

  constructor(
    private notesLogService: NotesLogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.note = new Note();
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.note = this.notesLogService.get(params['id']);
        this.noteLogId = params['id'];
        this.isNewNote = false;
      } else {
        this.isNewNote = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.isNewNote) {
      this.notesLogService.addNote(form.value);
    } else {
      this.notesLogService.update(
        this.noteLogId,
        form.value.title,
        form.value.body
      );
    }
    this.navigateBackToHome();
  }

  navigateBackToHome() {
    this.router.navigateByUrl('/');
  }
}
