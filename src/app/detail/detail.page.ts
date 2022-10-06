import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Note, NoteService } from '../note.service';
import * as Utils  from '../utils' 

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
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.updatedAt = new Intl.DateTimeFormat("fr-FR").format(this.note.updatedAt);
  }

  toggleFavorite() {
    Utils.toggleFavorite(this.note);
  }

  async share() {
    await Utils.share(this.note);
  }
}