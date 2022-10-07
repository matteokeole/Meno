import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Note, NoteService } from '../note.service';
import * as Utils from '../utils'
import { SplashScreen } from '@capacitor/splash-screen';

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

  ngOnInit() {
    this.notes = this.results = this.noteService.findAll();
  }

  /**
   * Searches through the note list.
   * 
   * @param e
   */
  searchNotes(e) {
    const expr = new RegExp(e.target.value.trim(), "gi");

    this.results = this.notes.filter(note =>
      expr.test(note.title) ||
      expr.test(note.content),
    );
  }

  /**
   * Formats the note last update date.
   * 
   * @param {Date} date
   * @returns {string}
   */
  formatDate(date: Date): string {
    // If the date is today, display the hour only
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
  

  /**
   * Creates a new note and navigates to its editor.
   */
  createNote() {
    const note = this.noteService.create({});

    this.router.navigate([`/note/${note.id}`]);
  }

  /**
   * Deletes the selected note.
   * A confirmation modal and a success toast are displayed before and after the deletion, respectively.
   * 
   * @async
   * @param {Note} note
   */
  async deleteNote(note: Note) {
    const alert = await this.alertController.create({
      header: "Confirmation",
      message: `Etes-vous sûr(e) de vouloir supprimer la note ${note.title} ?`,
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
        color: "success",
        duration: 2000,
      })).present();

      // Retrieve the updated list
      this.notes = this.results = this.noteService.findAll();
    }
  }

  /**
   * SplashScreen API test.
   * 
   * @async
   */
  async Splash(){
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  toggleFavorite(note: Note) {
    Utils.toggleFavorite(note);
    this.notes = this.results = this.noteService.findAll();
  }

  async share(note: Note) {
    await Utils.share(note);
  }
}