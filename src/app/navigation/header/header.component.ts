import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/shared/translate-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateConfigService) { }

  ngOnInit() {
  }
  get lang() { return localStorage.getItem("lang"); }


  changeLang(lang) {
    this.translate.setLanguage(lang);
    localStorage.setItem('lang', lang);
    if(lang == 'ar'){
      
      this.translate.setDir('rtl');
    }
    else {
      this.translate.setDir('ltr');
    }
    window.location.reload();
    
  }

}
