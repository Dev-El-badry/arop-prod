import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { UIService } from '../shared/ui.services';
import { OdooService } from '../shared/odoo.service';
import { PaymentModel } from  './payment.model';
@Injectable()
export class TravelerService {
  listBenfilts = [];
  loadListBenefits = new Subject<any[]>();
  loadResObjExcess = new Subject<any[]>();
  @Output() fire: EventEmitter<any> = new EventEmitter();
  @Output() firePaymentForm: EventEmitter<any> = new EventEmitter();

  paymentForm: PaymentModel = {
    cardNumber: null,
    expirationDate: null,
    cvCode: null
  };


  constructor(private http: HttpClient, private uiService: UIService, private odoo: OdooService) {

  }

  getJSessionId() {
      const jsId = document.cookie.match(/JSESSIONID=[^;]+/);
      let dd;
      if (jsId != null) {
          if (jsId instanceof Array) {
              dd = jsId[0].substring(11);
            } else {
              dd = String(jsId).substring(11);
            }
      }

      return dd;
  }

  getInfoTraveller() {
    const info = JSON.parse(localStorage.getItem('formData'));
    const total_price = Number(localStorage.getItem('total_price'));
    const type = info.data.package;

    const phone = info.data.phone;
    const full_name = info.data.c_name;
    const mail = info.data.mail;
    const address = info.data.add;
    const national = info.data.national;
    const gender = info.data.gender;
    const id = info.data.id;
    const confirm = info.data.confirm;
    const Passport = info.data.pass;

    const split_str = full_name.split(' ');
    const first_name = split_str[0];
    const middle_name = split_str[1];
    const last_name = split_str[2];
    const chk = info.data.chk;
    const condition = info.data.condition;

    return {
        phone,
        full_name,
        mail,
        address,
        total_price,
        package: 'your package: ' + type,
        first_name,
        middle_name,
        last_name,
        gender,
        id,
        national,
        Passport,
        confirm,
        chk,
        condition
    };

  }

  getInfoPersonal() {
    const info = JSON.parse(localStorage.getItem('formData'));
    const total_price = Number(localStorage.getItem('total_price'));
    const type = info.key;

    const phone = info.data.phone;
    const full_name = info.data.c_name;
    const mail = info.data.mail;
    const address = info.data.address;
    const national = info.data.national;
    const city = info.data.city;
    const gender = info.data.gender;
    const id = info.data.id;
    const lang = info.data.policyLang;



    const split_str = full_name.split(' ');
    const first_name = split_str[0];
    const middle_name = split_str[1];
    const last_name = split_str[2];

    const elig_bool = info.data.elig_bool;
    let othere;
    if (info.data.othere) {
      console.log('type of othere ', typeof( info.data.othere));
      othere = Object.values(info.data.othere);
    }
    return {
        phone,
        full_name,
        mail,
        address,
        national,
        city,
        total_price,
        package: 'your package: ' + type,
        first_name,
        middle_name,
        last_name,
        gender,
        id,
        othere,
        after_die: elig_bool,
        language: lang
    };

  }

  /* get payment list data */
  getPaymentFormData() {
    return this.firePaymentForm;
  }
  changePaymentFormData() {
    this.firePaymentForm.emit(this.paymentForm);
  }
  /* end get payment list data */

  getShowValue() {
    return this.fire;
  }

  get lang() { return localStorage.getItem('lang'); }

  changeStatusShowValue() {
    this.fire.emit(true);
  }

  fetchfetchBenefits() {
    this.onClear();
    this.uiService.loadingChangedStatus.next(true);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    if (this.lang === 'en') {
      const data = {paramlist: {filter: [],
        need: []}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      'travel.benefits', 'search_read', data).subscribe(res => {
        for (const x in res) {
          const cover = res[x].cover;
          const limit = res[x].limit;
          if (cover !== false) {
            this.listBenfilts.push({
              cover,
              limit
            });
          }
        }

        this.loadListBenefits.next(this.listBenfilts);
        this.uiService.loadingChangedStatus.next(false);
      });
    } else {
      const data = {paramlist: {filter: [],
        need: ['ar_cover', 'ar_limit']}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      'travel.benefits', 'search_read', data).subscribe(res => {

        for (const x in res) {
          res[x].cover = res[x].ar_cover;
          delete res[x].ar_cover;
          res[x].limit = res[x].ar_limit;
          delete res[x].ar_limit;
          const cover = res[x].cover;
          const limit = res[x].limit;
          if (cover !== false) {
            this.listBenfilts.push({
              cover,
              limit
            });
         }
        }

        this.loadListBenefits.next(this.listBenfilts);
        this.uiService.loadingChangedStatus.next(false);
      });
    }
  }

  fetchExcess() {
    this.uiService.loadingChangedStatus.next(true);

    if (this.lang === 'en') {
      const data = {paramlist: {filter: [],
        need: []}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      'travel.excess', 'search_read', data).subscribe(res => {
        this.loadResObjExcess.next(res);
        this.uiService.loadingChangedStatus.next(false);
      });
    } else {
      const data = {paramlist: {filter: [],
        need: ['ar_rule', 'amount']}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      'travel.excess', 'search_read', data).subscribe(res => {
        for (const x of res) {
          x.rule = x.ar_rule;
          delete x.ar_rule;
        }
        this.loadResObjExcess.next(res);
        this.uiService.loadingChangedStatus.next(false);
      });
    }
  }

  onClear() {
    this.loadListBenefits.next([]);
    this.loadResObjExcess.next([]);
    this.listBenfilts = [];
  }

  // fetchBenefits(){
  //   this.http.post('')
  // }
}
