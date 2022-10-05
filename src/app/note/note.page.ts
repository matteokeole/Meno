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

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Convert the string ID to a number
    const id = +this.activatedRoute.snapshot.paramMap.get("id");

    this.note = this.noteService.find(id);

    console.log(this.note);
  }
}