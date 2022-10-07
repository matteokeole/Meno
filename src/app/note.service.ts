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
  private defaultNote;

  constructor() {
    this.defaultNote = {
      title: "Nouvelle note",
      content: "",
      isFavorite: false,
      updatedAt: new Date,
    };
    this.notes = [];

    // Fixtures
    for (let i = 1; i <= 10; i++) this.create({
      title: `Note ${i}`,
      content: `Contenu de la note ${i}`,
      isFavorite: !Math.floor(8 * Math.random()),
    });
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
    // Ensure that the note title is not only spaces
    note.title = note.title.trim();

    // Ensure that the note title is never empty
    note.title ||= this.defaultNote.title;

    note.updatedAt = new Date;
  }

  delete(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}