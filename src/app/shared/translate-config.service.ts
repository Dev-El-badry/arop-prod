import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class TranslateConfigService {
  constructor(private translate: TranslateService, @Inject(DOCUMENT) private doc) {}

  getDefaultLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }

  setLanguage(setLang) {
    this.translate.use(setLang);
    
  }

  setDefault(defLang) {
    this.translate.setDefaultLang(defLang);
  }

  setDir(dir:string) {
    this.doc.dir = dir;
  }

  getDir() {
    return this.doc.dir;
  }
}