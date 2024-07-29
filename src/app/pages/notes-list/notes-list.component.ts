import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesLogService } from 'src/app/shared/notes-log.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit{
  notes: Note[] = new Array<Note>();

  constructor(private notesLogService:NotesLogService){}

  ngOnInit(): void {
    this.notes = this.notesLogService.getAll();
  }

  onDeleteNote(index:number){
    this.notesLogService.delete(index);
  }
}
