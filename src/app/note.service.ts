import { Injectable } from '@angular/core';
import { Fixtures } from './fixtures';

export interface Note {
  id: number,
  content: string,
  updatedAt: Date,
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[];

  constructor() {
    this.notes = Fixtures.loadNotes();
  }

  find(id: number): Note {
    return this.notes.find(note => note.id === id);
  }

  findAll(): Note[] {
    return this.notes;
  }

  findBy(filters: object): Note[] {
    let notes = [];

    for (const [column, value] of Object.entries(filters)) {
      notes = notes.concat(this.notes.filter(note => note[column] === value));
    }

    return notes;
  }

  findOneBy(filters: object): Note {
    const note = this.findBy(filters);
    return note.length ? note[0] : undefined;
  }


   delete(id: number|Note): void  {
     this.notes = typeof id === "number" ?
       this.notes.filter(this.note => this.note.id !== id) :
       this.notes.filter(this.note => this.note.id !== id.id);
   }
}