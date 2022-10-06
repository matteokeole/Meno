import { Injectable } from '@angular/core';

let id = 0;

export interface Note {
  id: number,
  title: string,
  content: string,
  isFavorite: boolean,
  updatedAt: Date,
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[];
  private defaultNote: object;

  constructor() {
    this.defaultNote = {
      title: "Nouvelle note",
      content: "",
      isFavorite: false,
      updatedAt: new Date,
    };
    this.notes = [];

    for (let i = 1; i <= 10; i++) {
      this.create({
        title: `pouet${i}`,
        content: `Content pouet${i}`,
        isFavorite: !(i % 3),
      });
    }
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

  create(note): Note {
    note = {
      id: ++id,
      ...this.defaultNote,
      ...note,
    };

    this.notes.push(note);

    return note;
  }

  save(note: Note): void {
    note.updatedAt = new Date;
  }

  delete(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}