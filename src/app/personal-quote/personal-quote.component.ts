import { Component, OnInit } from '@angular/core';
import { OdooService } from '../shared/odoo.service';

@Component({
  selector: 'app-personal-quote',
  templateUrl: './personal-quote.component.html',
  styleUrls: ['./personal-quote.component.css']
})
export class PersonalQuoteComponent implements OnInit {
  covers;
  filters;
  results;
  displayedColumns: string[] = ['cover', 'descriptions'];

  constructor(private odoo: OdooService) {
  }
  ngOnInit() {
    this.filters = JSON.parse(localStorage.getItem('covers'));
    console.log(this.filters.name);

    if (this.lang === 'en') {
      const datas = {paramlist: {filter: [['cover_id', '=', this.filters.name]], need: []}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      'cover.table', 'search_read', datas ).subscribe(res => {
        for ( let i = 0; i < res.length; i++) {
          if ( res.cover_id === false) {
            res.splice(i, 1);
            }
        }
        this.covers = res;
      });
    } else {
      const ardata = {paramlist: {filter: [['ar_cover_id', '=', this.filters.name]], need: ['ar_cover_id', 'ar_desc']}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
    'cover.table', 'search_read', ardata ).subscribe(res => {
        this.covers = res;
        // for ( let i = 0; i < this.covers.length; i++) {
        //   if ( this.covers[i].ar_cover_id === false) {
        //     this.covers.splice(i, 1);
        //     }
        // }
        for (const result of this.covers) {
          result.cover_id = result.ar_cover_id;
          delete result.ar_cover_id;
          result.desc = result.ar_desc;
          delete result.ar_desc;
        }
    });
  }
  }

  get lang() { return localStorage.getItem('lang'); }


}
