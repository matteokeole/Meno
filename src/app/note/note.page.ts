import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Note, NoteService } from '../note.service';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  public note: Note;
  private editorConfig: object;
  private timeout;

  constructor(
    private noteService: NoteService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
  ) {
    // TinyMCE configuration
    this.editorConfig = {
      base_url: '/tinymce',
      suffix: '.min',
      height: '95vh',
      menubar: true,
      toolbar_location: 'bottom',
      toolbar:
        'undo redo |  strikethrough | styleselect | formatselect | bold italic backcolor | forecolor |\
      bullist numlist ',
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    };
  }

  ngOnInit() {
    // Retrieve the current note
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.note = this.noteService.find(id);
  }

  /**
   * Initializes the TinyMCE editor for the note.
   *
   * @param {object} e  Event
   */
  init(e) {
    const { editor } = e;

    // Set note content
    editor.setContent(this.note.content);

    // Hide the TinyMCE status bar
    document.querySelector('.tox-statusbar').remove();
  }

  /**
   * Saves the TinyMCE editor content.
   * 250ms debounce.
   *
   * @param {object} e  Event
   */
  save(e) {
    const { editor } = e;

    // Reset the timeout
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.note.content = editor.getContent();

      this.noteService.save(this.note);
    }, 250);
  }

  /**
   * Displays the note details modal.
   *
   * @see {@link ../detail/detail.page.ts}
   * @async
   */
  async showDetails() {
    (
      await this.modalController.create({
        component: DetailPage,
        componentProps: {
          note: this.note,
        },
        canDismiss: true,
        breakpoints: [.25, .5, .75],
        initialBreakpoint: .25,
      })
    ).present();
  }
}