import { Component ,OnInit  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnInit {
  tinyMCEConfiguration;
  constructor() {
    this.tinyMCEConfiguration ={
      base_url: '/tinymce', 
      suffix: '.min'       
    }
  }

  ngOnInit() {
    
  }
}
  

