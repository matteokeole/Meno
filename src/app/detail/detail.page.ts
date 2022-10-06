import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note.service';
import * as Utils  from '../utils' 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() note: Note;

  private updatedAt: string;

  constructor()
  {}

  ngOnInit() {
    this.updatedAt = new Intl.DateTimeFormat("fr-FR").format(this.note.updatedAt);
  }

  
  async share() {
    await Utils.share(this.note)
  }

  
  
 
}