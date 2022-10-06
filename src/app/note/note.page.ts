import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note, NoteService } from '../note.service';
import { Share } from '@capacitor/share';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  public note: Note;
  private updatedAt: string;
  private editorConfig: object;
  private timeout;
  private delay: number;
  private presentingElement;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.editorConfig = {
      base_url: "/tinymce",
      suffix: ".min",
      height: 800,
    }
    this.delay = 250;
    this.presentingElement = null;
  }

  ngOnInit() {
    // Convert the string ID to a number
    const id = +this.activatedRoute.snapshot.paramMap.get("id");

    this.note = this.noteService.find(id);

    this.presentingElement = document.querySelector(".ion-page");

    this.updatedAt = new Intl.DateTimeFormat("fr-FR").format(this.note.updatedAt);
  }

  init(e) {
    const {editor} = e;

    // Set note content
    editor.setContent(this.note.content);

    // Hide the TinyMCE status bar
    document.querySelector(".tox-statusbar").remove();
  }

  async sharing(){
    const info = await Device.getInfo();
    const infoBattery = await Device.getBatteryInfo();
    await Share.share({
      title: this.note.title,
      text: `${this.note.content} depuis mon ${info.model} chargé à ${infoBattery.batteryLevel * 100}%`,
    });
  }

  save(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.note.content=e.editor.getContent();
      this.noteService.save(this.note);

      console.log("Saving...");
    }, this.delay);
  }
}