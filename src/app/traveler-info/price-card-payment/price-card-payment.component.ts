
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WelcomeService } from '../../welcome/welcome.service';
import { TravelerService } from '../traveler.service';
import { NgForm } from '@angular/forms';
import { OdooService } from '../../shared/odoo.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

// declare function Checkout(): any;

@Component({
  selector: 'app-price-card-payment',
  templateUrl: './price-card-payment.component.html',
  styleUrls: ['./price-card-payment.component.css']
})
export class PriceCardPaymentComponent implements OnInit {
  totalPrice;
  formList;
  isDisabled = false;
  isLoading = false;
  isLoadingSubs: Subscription;
  fullName: string;
  @Output() clickedDone = new EventEmitter();
  constructor(
    private welService: WelcomeService,
    private travelerService: TravelerService,
    private odoo: OdooService,
    private http: HttpClient,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.formList = this.travelerService.paymentForm;
    console.log('formList', this.formList.cardNumber);
    this.totalPrice = localStorage.getItem('total_price');


    // this.welService.priceLoad.subscribe(result => {
    //   this.totalPrice = result;
    // });

    // this.welService.getValuePrice();
  }

  submitFormPriceCard(form: NgForm) {
    this.fullName = localStorage.getItem('fullName');

    this.isLoading = true;
    console.log('ay kala,');
    if (form.valid) {
      console.log('ayyy');
      const formData = JSON.parse(localStorage.getItem('formData'));

      const data = { paramlist: {data: formData.data} };
      console.log('data', data);
      if (formData.key === 'travel') {
        // setup download file
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');


        this.odoo.call_odoo_function(
            'travel_agency',
            'online',
            'online',
            'travel.front',
            'create_policy',
            data
          )
          .subscribe(res => {
            console.log('ressss', res);
            // this.testDownload();

            // download file
            this.http.get('http://207.154.195.214:8070/report/' + res[0], { headers, responseType: 'blob' }).subscribe(res => {
              console.log(res);
              saveAs(res, `Policy (AROPE).pdf`);
              // return this.http.get('http://207.154.195.214:8070/Terms/');
              // const link = document.createElement('a');
              // link.href = '207.154.195.214/TravelWording.pdf';
              // link.download = 'file.pdf';
              // link.dispatchEvent(new MouseEvent('click'));
              window.open('http://207.154.195.214/TravelWording_General_Conditions.pdf', '_blank');
              this.downloadTerms('http://207.154.195.214/TravelWording_General_Conditions.pdf');
            });

            this.whenSucceed();
          });
        } else {
          let headers = new HttpHeaders();
          headers = headers.set('Accept', 'application/pdf');
          console.log('personal==> ', data);
          this.odoo.call_odoo_function('travel_agency', 'online', 'online',
          'personal.front', 'create_policy', data ).subscribe(res => {
            console.log(res);
            this.http.get('http://207.154.195.214:8070/report/personal/' + res[0], { headers, responseType: 'blob' }).subscribe(res => {
              console.log(res);
              saveAs(res, `Policy (AROPE).pdf`);
              this.downloadTerms('http://207.154.195.214/PA_General_Conditions.pdf');
              window.open('http://207.154.195.214/PA_General_Conditions.pdf', '_blank');
            });
            this.whenSucceed();
          });
  }
    }
  }

  whenSucceed() {
    this.isLoading = false;
    this.clickedDone.emit(true);
    this.isDisabled = true;
    window.scrollTo(0, 0);
    localStorage.clear();
    localStorage.setItem('fullName', this.fullName);
  }
  testDownload() {
    // tslint:disable-next-line:max-line-length
    this.http.get('http://207.154.195.214:8070/web/login?redirect=http%3A%2F%2F207.154.195.214%3A8070%2Freport%2Fpdf%2Fsmart_travel_agency.policy%2F54').subscribe(res => {
    console.log('Downloaaad', res);
  });
  }

  downloadTerms(url) {
    let header = new HttpHeaders();
    header = header.set('Accept', 'application/pdf');
    this.http.get(url, { headers: header, responseType: 'blob' }).subscribe(res => {
      console.log(res);
      saveAs(res, `Terms&Conditions.pdf`);
    });
  }

}

