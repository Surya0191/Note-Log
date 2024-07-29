import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesLogService {
  notesLog: Note[] = new Array<Note>();

  constructor() {}

  get(id: number) {
    return this.notesLog[id];
  }

  getId(note: Note) {
    return this.notesLog.indexOf(note);
  }

  addNote(note: Note): number {
    let newLength = this.notesLog.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let note = this.notesLog[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notesLog.splice(id, 1);
  }

  getAll():Note[]{
    return this.notesLog;
  }
}
