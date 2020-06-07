

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from '../shared/ui.services';
import { OdooService } from '../shared/odoo.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class WelcomeService {
  priceValue;
  countries = [
    { value: 'zone 1', viewValue: 'Europe' },
    { value: 'zone 2', viewValue: 'Worldwide excluding USA & CANADA' },
    { value: 'zone 3', viewValue: 'Worldwide' }
  ];


  resultData;
  priceLoad = new Subject<any>();
  constructor(private translate: TranslateService,private http: HttpClient, private router: Router, private uiService: UIService, private odoo: OdooService) {

  }




  setListDates(data) {
    this.resultData = data;
    console.log('resss', this.resultData);
  }

  getAllCountries() {
    return this.countries;
  }

  getListDates() {
    return JSON.stringify(this.resultData);
  }

  getMinDateBefore30Days() {
   const minDate = new Date();
   minDate.setDate(minDate.getDate() - 30);
   return minDate;

  }

  sendQuoteResult(fun, data) {

    this.uiService.loadingChangedStatus.next(true);

    this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
     fun, data).subscribe(res => {
        const x = res.gross.toFixed(2);
        console.log(res);
        localStorage.setItem('total_price', parseInt(x.toString(), 10).toString());
        this.priceValue = res;
        this.uiService.loadingChangedStatus.next(false);
        this.router.navigate(['/','traveler-insurance','traveler-info']);
     }, error => this.handleError(error.statusText));

  }


  getValuePrice() {
    const price = this.priceValue;
    this.priceLoad.next(price);
  }

  handleError(error) {

    // let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // server-side error
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    this.uiService.snackbar(error, 'Try Again', 3000);
  }
}

