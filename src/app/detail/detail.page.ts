import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Note, NoteService } from '../note.service';
import * as Utils from '../utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() note: Note;

  private updatedAt: string;

  constructor(
    private noteService: NoteService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.updatedAt = new Intl.DateTimeFormat("fr-FR").format(this.note.updatedAt);
  }

  /**
   * Changes the note title.
   * A toast is displayed upon success.
   * 
   * @async
   * @param e
   */
  async changeTitle(e) {
    this.note.title = e.target.value;
    this.noteService.save(this.note);

    (await this.toastController.create({
      icon: "checkmark-circle-outline",
      message: "Le titre a été mis à jour.",
      color: "success",
      duration: 2000,
    })).present();
  }

  toggleFavorite() {
    Utils.toggleFavorite(this.note);
  }

  async share() {
    await Utils.share(this.note);
  }
}