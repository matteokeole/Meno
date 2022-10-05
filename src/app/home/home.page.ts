import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
    private router: Router,
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

  createNote() {
    const note = this.noteService.create({
      title: "Nouvelle note",
      content: "",
    });

    this.router.navigate([`/note/${note.id}`]);
  }

  async deleteNote(note: Note) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous supprimer la note ${note.title} ?`,
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
        }, {
          text: "Supprimer",
          role: "destructive",
        },
      ],
    });

    alert.present();

    const response = await alert.onDidDismiss();

    if (response.role === "destructive") {
      this.noteService.delete(note.id);

      (await this.toastController.create({
        icon: "checkmark-circle-outline",
        message: "La note a été supprimée.",
      })).present();

      // Retrieve the updated list
      this.notes = this.results = this.noteService.findAll();
    }
  }
}