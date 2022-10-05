import { Component, OnInit } from '@angular/core';

import { Note, NoteService } from '../note.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private editorConfig: object;
  private timeout;
  private delay: number;
  private notes: Note[];
  private results: Note[];

  constructor(private noteService: NoteService) {
    this.editorConfig = {
      base_url: '/tinymce',
      suffix: '.min',
    };

    this.delay = 250;
  }

  ngOnInit(): void {
    this.notes =this.results = this.noteService.findAll();
  }
  
  searchNotes(e): void {
    const query = e.target.value.toLowerCase();
    this.results = this.notes.filter(
      (note) =>
        note.content.toLowerCase().includes(query) ||
        note.updatedAt.toString().includes(query)
    );
  }

  init(e): void {
    // Hide the TinyMCE status bar
    document.querySelector('.tox-statusbar').remove();
  }
  formatDate(date: Date): string {
    // si la date est aujourd'hui, on affiche l'heure
    if (date.toDateString() === new Date().toDateString()) {
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }
  

  save(e): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('Saving...');
    }, this.delay);
  }
}
