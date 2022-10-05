import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note, NoteService } from '../note.service';

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
  private canDismiss: boolean;
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
    this.canDismiss = true;
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

  save(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.note.content=e.editor.getContent();
      this.noteService.save(this.note);

      console.log("Saving...");
    }, this.delay);
  }
}