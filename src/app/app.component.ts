import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public tabs: Array<object> = [
    {
      route: "home",
      icon: "home",
      name: "Accueil",
    }, {
      route: "roster",
      icon: "people-circle",
      name: "Etudiants",
    },
  ];
}