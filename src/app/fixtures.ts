import { Note } from './note.service.js';

export const Fixtures = {
  loadNotes(): Note[] {
    const notes: Note[] = [
      {
        id: 1,
        title : 'title 1 ',
        content: "pouet",
        updatedAt: new Date,
      }, {
        id: 2,
        title : 'title 2 ',
        content: "pouet pouet",
        updatedAt: new Date,
      },
      {
        id: 3,
        title : 'title 3',
        content: "pouet pouet pouet",
        updatedAt:  new Date(new Date().setDate(new Date().getDate() + 3)),
      },

    ];

    return notes;
  },
};