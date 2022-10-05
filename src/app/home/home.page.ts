import { Component ,OnInit  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {
  private editorConfig: object;
  private timeout;
  private delay: number;

  constructor() {
    this.editorConfig = {
      base_url: "/tinymce", 
      suffix: ".min",       
    }

    this.delay = 250;
  }

  ngOnInit(): void {}

  init(e): void {
    // Hide the TinyMCE status bar
    document.querySelector(".tox-statusbar").remove();
  }

  save(e): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log("Saving...");
    }, this.delay);
  }
}