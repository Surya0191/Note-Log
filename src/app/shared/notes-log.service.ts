import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesLogService {
  notesLog: Note[] = [
    {
      title: "Shopping List",
      body: "Buy milk, eggs, bread, and cheese."
    },
    {
      title: "Meeting Notes",
      body: "Reviewed project milestones and set deadlines. Assigned tasks to the team, with a focus on completing wireframes by week's end. Need to follow up with the design team and monitor progress regularly."
    },
    {
      title: "Travel Plans",
      body: "Book flights and hotel for the trip to Paris. Visit Eiffel Tower and Louvre Museum."
    }
  ];

  constructor() {}

  get(id: number) {
    return this.notesLog[id];
  }

  getId(note: Note) {
    return this.notesLog.indexOf(note);
  }

  addNote(note: Note): number {
    let newLength = this.notesLog.unshift(note);
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
