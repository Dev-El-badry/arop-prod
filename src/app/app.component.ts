import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from './shared/translate-config.service';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arope';
  position: 'end' | 'start';
  constructor(private translateService: TranslateConfigService, private router: Router, private trnaslateService: TranslateConfigService) {}

  get lang() { return localStorage.getItem('lang'); }
  currentDir: 'rtl' | 'ltr';
  ngOnInit() {
    this.translateService.setLanguage(this.lang);
    this.translateService.setDefault(this.lang);

  //   // get segments
  //   const tree: UrlTree = this.router.parseUrl(this.router.url);
  //   const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
  //  // const s: UrlSegment[] = g.segments;
  //   console.log('save', this.router.url);
  //   // this.router.navigateByUrl('/traveler-insurance');



    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';

    this.changeLang();
  }

  changeLang() {
    let lang = localStorage.getItem('lang');
    
    if(!lang) {
      
      this.trnaslateService.setLanguage('ar');
      this.trnaslateService.setDefault('ar');
      this.trnaslateService.setDir('rtl');
      localStorage.setItem('lang', 'ar');
      this.position = 'start';
      this.currentDir = 'rtl';
    } else {
      let langStorage = localStorage.getItem('lang');
      this.trnaslateService.setLanguage(langStorage);
      this.trnaslateService.setDefault(langStorage);

      if(langStorage === 'ar') {
        this.trnaslateService.setDir('rtl');
        this.position = 'start';
        this.currentDir = 'rtl';
      }
      else if(langStorage === 'en') {
        this.trnaslateService.setDir('ltr');
        this.position = 'end';
        this.currentDir = 'ltr';
      }
        
    }
  }

  toggleRTL() {
    this.currentDir = this.currentDir === 'ltr' ? 'rtl' : 'ltr';
  }
}
