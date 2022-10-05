import { Note } from './note.service.js';

export const Fixtures = {
  loadNotes(): Note[] {
    const notes: Note[] = [
      {
        id: 1,
        content: "pouet",
        updatedAt: new Date,
      }, {
        id: 2,
        content: "pouet pouet",
        updatedAt: new Date,
      },
    ];

    return notes;
  },
};