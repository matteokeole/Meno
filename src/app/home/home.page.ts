import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Note, NoteService } from '../note.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private notes: Note[];
  private results: Note[];

  constructor(
    private noteService: NoteService,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.notes = this.results = this.noteService.findAll();
  }

  searchNotes(e): void {
    const query = e.target.value.toLowerCase();
    this.results = this.notes.filter(
      (note) =>
        note.content.toLowerCase().includes(query) ||
        note.updatedAt.toString().includes(query)  || 
        note.title.toString().includes(query)
    );
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

  async deleteNoteAlert(note: Note) {
    const alert = await this.alertController.create({
      header: 'Confirmation de suppression',
      subHeader: 'di',
      message: `Etes-vous sûr(e) de vouloir supprimer ${note.content} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          role: 'destructive',
        },
      ],
    });

    alert.present();

    const response = await alert.onDidDismiss();

    if (response.role === 'destructive') {
      this.noteService.delete(note.id);
      this.notes = this.results = this.noteService.findAll();
    }
  }
  async deleteNoteAlert(note: Note) {
    const alert = await this.alertController.create({
      header: 'Confirmation de suppression',
      subHeader: 'di',
      message: `Etes-vous sûr(e) de vouloir supprimer ${note.content} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          role: 'destructive',
        },
      ],
    });

    alert.present();

    const response = await alert.onDidDismiss();

    if (response.role === 'destructive') {
      this.noteService.delete(note.id);
      this.notes = this.results = this.noteService.findAll();
    }
  }
}
