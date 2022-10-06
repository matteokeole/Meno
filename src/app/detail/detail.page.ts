import { Component, OnInit, Input } from '@angular/core';
import { Share } from '@capacitor/share';
import { Device } from '@capacitor/device';
import { Note } from '../note.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() note: Note;

  private updatedAt: string;

  ngOnInit() {
    this.updatedAt = new Intl.DateTimeFormat("fr-FR").format(this.note.updatedAt);
  }

  /**
   * Shares the note with other users.
   * This uses the Capacitor Share API (and the Capacitor Device API for message additional infos).
   * 
   * @async
   */
  async share() {
    const
      {model} = await Device.getInfo(),
      percent = (await Device.getBatteryInfo()).batteryLevel * 100;

    await Share.share({
      title: this.note.title,
      text: `${this.note.content} depuis mon ${model} chargé à ${percent}%`,
    });
  }
}