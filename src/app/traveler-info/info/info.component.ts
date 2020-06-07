import { WelcomeService } from './../../welcome/welcome.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, AbstractControl} from '@angular/forms';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { OdooService } from 'src/app/shared/odoo.service';
import { TravelerService } from '../traveler.service';
import { ValidationService } from 'src/app/shared/validation.service';
import { saveAs } from 'file-saver';

//pament component
import { PaymentDialogComponent } from '../../shared/payment-dialog.comopnent';
// FORMATE DATE
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from 'src/app/shared/ui.services';
import 'rxjs/add/operator/catch';

declare let Checkout: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class InfoComponent implements OnInit, AfterViewChecked {

  constructor(
    private setting: SiteSettingsService,
    private odoo: OdooService,
    private welService: WelcomeService,
    private travelerService: TravelerService,
    private validation: ValidationService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    private routerActivated: ActivatedRoute,
    private uiService: UIService,
    private http: HttpClient,
    public dialog: MatDialog,
    // private save: saveAs
  ) {
  }
  @ViewChild('fInfo', {static: false}) customForm: NgForm;
  sessionID: string;
  // @ViewChild('fInfo', {static: true}) form: NgForm;
  numOfTravelers = [];
  types  = [
    {value: 'spouse', viewValue: 'Spouse'},
    {value: 'kid', viewValue: 'Kid'}

  ];
  numberPattern = '^(\d|\w)+$';
  minDateKid;
  maxDateKid;
  dataJson;
  typesList;
  datesList;
  checked;
  check = true;
  isValidFormSubmitted = false;
  isConfrim = false;
  mail: boolean;
  type;
  date;
  indi;
  cid: boolean;
  breakpoint: number;
  breakpoint2: number;
  // isFirstPolicy = true;
  national = 'egyptian';
  isEgyptian = true;
  data_info = {
    phone: '',
    full_name: '',
    mail: '',
    address: '',
    total_price: 0,
    package: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    id: '',
    national: 'egyptian',
    Passport: '',
    confirm: false,
    chk: false,
    condition: false
  };
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  //   // this.checkMailValidator

  // ]);


  // emailFormControl = new FormControl(null, [this.checkMailValidator]);

  matcher = new MyErrorStateMatcher();
  @Output() changeStatus = new EventEmitter();
  qnbConfig;
  addScript = false;

  ngOnInit() {

   this.setting.getSession();
    // this.getSession();


   this.breakpoint = window.innerWidth <= 700 ? 1 : 2;
   this.breakpoint2 = window.innerWidth <= 700 ? 1 : 3;

    // start qnp config
    // this.initQnpConfig();
      // end qnp config
  // params query
   this.routerActivated.queryParamMap.subscribe(param => {

    // start code
    if (param.has('step')) {
      console.log('text', param.get('step'));
      localStorage.setItem('stepper', 'true');
      this.changeStatus.emit(true);
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
            this.uiService.loadResId.next(res[1]);
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


          });
        }

    }

  });


   this.type = localStorage.getItem('type');
   if (this.type === 'individual') {
    this.indi = true;
    this.date = localStorage.getItem('date');
  } else {
    const fJson = JSON.parse(localStorage.getItem('typesDates'));
    this.dataJson = JSON.parse(fJson);
    this.typesList = this.dataJson.types;
    this.datesList = this.dataJson.dates;
    console.log('DateList', this.datesList);
  }
   if (this.lang === 'en') {
    this.dateAdapter.setLocale('en');
  } else if (this.lang === 'ar') {
    this.dateAdapter.setLocale('ar');
  }
   this.minDateKid = this.setting.getDateInYears(18);
   this.maxDateKid = this.welService.getMinDateBefore30Days();
   const emptyArr = new Array(
    parseInt(localStorage.getItem('numOfTraveler'))
  );
   for (let i = 0; i < emptyArr.length; i++) {

    console.log('count', i);
    this.numOfTravelers.push(i);
   }

    // this.loadStripe();
    // this.loadData();
    // this.mail = false;
    // this.checkMail('ahmednourelhalaby@gmail.com');
  }
  downloadTerms(url) {
    let header = new HttpHeaders();
    header = header.set('Accept', 'application/pdf');
    this.http.get(url, { headers: header, responseType: 'blob' }).subscribe(res => {
      console.log(res);
      saveAs(res, `Terms&Conditions.pdf`);
    });
  }
  ngAfterViewChecked() {
    const script = document.querySelector('#myscript');
    script.setAttribute('data-complete', 'http://207.154.195.214/arope/traveler-insurance/traveler-info?step=thankyou');

    console.log('script added');
  }

  initQnpConfig() {
    const data_traveler = JSON.parse(localStorage.getItem('formData'));
    const total_price = localStorage.getItem('total_price');
    const sessionIDLocalStorage = localStorage.getItem('__arop_session_id');
   
    if (data_traveler) {
      console.log('data traveler', data_traveler);
      this.data_info = this.travelerService.getInfoTraveller();
      console.log('data-info', this.data_info);
    }

    this.national = this.data_info.national;
    // qnp config
    this.qnbConfig = {
      merchant: 'TESTQNBAATEST001',
      session: {
        id: sessionIDLocalStorage
      },
      order: {
          amount() {
              // Dynamic calculation of amount
              return Number(total_price);
          },
          currency: 'EGP',
          description: this.data_info.package

      },
        interaction: {
          // operation: 'AUTHORIZE',
          merchant      : {
            name   : 'شركة أروب مصر',
            address: {
              line1: '30, Msadak, Ad Doqi Giza 12411'
            },
            phone  : '02 33323299',

            logo   : 'https://aropeegypt.com.eg/Property/wp-content/uploads/2019/10/Logoz-3.jpg'
          },
          locale        : 'ar_EG',
          theme         : 'default',
          displayControl: {
              billingAddress  : 'HIDE',
              customerEmail   : 'HIDE',
              orderSummary    : 'HIDE',
              shipping        : 'HIDE'
            }
          }
  };

    console.log('qnp config', this.qnbConfig);

    Checkout.configure(this.qnbConfig);
  }


  qnbScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://qnbalahli.test.gateway.mastercard.com/checkout/version/56/checkout.js';
      scriptElement.setAttribute('data-complete', 'http://207.154.195.214/arope/traveler-insurance/traveler-info?step=thankyou');
      scriptElement.setAttribute('data-error', 'errorCallback');
      scriptElement.onload = resolve;
      document.head.appendChild(scriptElement);
    });
  }

  get lang() { return localStorage.getItem('lang'); }


  fullNameText(firstName, middleName , LastName) {
    return firstName + ' '  + middleName + ' ' + LastName;
  }
  goEmptyDate() {
    const selectElement = document.querySelector('.selectOptionType');
    selectElement.addEventListener('change', (event) => {
      console.log('show event value', event);
    });

  }

  setLocale(val) {
    console.log(val);
    this.dateAdapter.setLocale(val);
  }

  onResize(event) {

    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
    this.breakpoint2 = event.target.innerWidth <= 700 ? 1 : 3;
  }

loadStripe() {

  if (!window.document.getElementById('stripe-script')) {
    const s = window.document.createElement('script');
    s.id = 'stripe-script';
    s.type = 'text/javascript';
    s.src = 'https://qnbalahli.test.gateway.mastercard.com/checkout/version/49/checkout.js';
    s.setAttribute('data-error', 'errorCallbackn');
    s.setAttribute('data-cancel', 'cancelCallback');
    window.document.head.appendChild(s);
  }
}

  submitTravelerInfoV2(form: NgForm) {


    this.isValidFormSubmitted = false;
    const age = this.setting.convertDate(form.value.dateBirth);
    const when = this.setting.convertDate(localStorage.getItem('when'));
    const till = this.setting.convertDate(localStorage.getItem('till'));

    const fullName = this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName);
    localStorage.setItem('fullName', fullName);
    // console.log(this.emailFormControl);
    if (localStorage.getItem('type') === 'individual') {



      const formData = {data: {
        source: 'online',
        package: localStorage.getItem('type'),
        c_name: this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName),
        add: form.value.address,
        pass: form.value.Passport,
        dob: age,
        gender: form.value.gender,
        phone: form.value.phoneNumber,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: [],
        id: form.value.id,
        mail: form.value.emailAddress,
        national: form.value.national,
        confirm: true,
        chk: true,
        condition: true
      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      const data = {paramlist: {data: {z: localStorage.getItem('zone'), d: [age],
        p_from: when, p_to: till}}};
      this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
        'get_individual', data).subscribe(res => {
          const x = res.gross.toFixed(2);
          localStorage.setItem('total_price', parseInt(x.toString(), 10).toString());
          this.changeShowValue();


          this.onClickAfterSubmit();
        });
      const caching = {
        fname: form.value.firstName,

        lname: form.value.lastName,
        gender: form.value.gender,
        email: form.value.emailAddress,
        phone: form.value.phoneNumber,

      };
      // this.welService.sendQuoteResult('get_individual', data);
    } else {
      const object = form.value.additionalTravelers;
      console.log('hhhhhhhhhhhhhhhh', object);
      const objectKeys = Object.keys(object);
      const objectKeysLen = objectKeys.length / 8;
      let index = 1;
      const emptyArr = [];
      const kidAges = [];
      while (index <= objectKeysLen) {
        const types = object['type' + index];
        const firstName = object['tfirstName' + index];
        const middleName = object['tmiddleName' + index];
        const lastName = object['tlastName' + index];
        const dateBirth = object['tbirthDate' + index];
        const passports = object['tpassport' + index];
        const genders = object['tgender' + index];
        const fullName = ''.concat(' ', firstName, ' ', middleName, ' ', lastName);
        const jsonData = {
          name: fullName,
          dob: dateBirth,
          type: types,
          passport_num: passports,
          gender: genders
        };
        emptyArr.push(jsonData);
        if (types === 'kid') {
          kidAges.push(dateBirth);
        }

        index ++;
        }
      const data = {paramlist: {data: {z: localStorage.getItem('zone'), p_from: when,
        p_to: till, kid_dob: kidAges}}};
      const familyD = emptyArr;
      const formData = {data: {
        source: 'online',
        package: localStorage.getItem('type'),
        c_name: this.fullNameText(form.value.firstName, form.value.middleName, form.value.lastName),
        add: form.value.address,
        pass: form.value.Passport,
        gender: form.value.gender,
        phone: form.value.phoneNumber,
        dob: age,
        zone: localStorage.getItem('zone'),
        p_from: when,
        p_to: till,
        family: familyD,
        mail: form.value.emailAddress,
        id: form.value.id,
        confirm: true,
        national: form.value.national,
        chk: true,
        condition: true

      }, key: 'travel'};
      localStorage.setItem('formData', JSON.stringify(formData));
      this.odoo.call_odoo_function('travel_agency', 'online', 'online', 'policy.travel',
      'get_family', data).subscribe(res => {
        const x = res.gross.toString();
        console.log(x);
        // console.log(res);
        localStorage.setItem('total_price', x);
        this.changeShowValue();


        this.onClickAfterSubmit();
      });
      this.welService.sendQuoteResult('get_family', data);
    }
    this.isValidFormSubmitted = true;
    // form.resetForm();


  }

  submitTravelerInfo(form: NgForm) {
    console.log(form.value);

    this.showPopup();
  }

  showPopup() {
    
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: {
        datesList: 'hello world'
      }

    })
    dialogRef.afterClosed().subscribe(result => {

      console.log('close');

    });
  }

  onClickAfterSubmit() {
    this.initQnpConfig();
    console.log('data start', this.data_info);
    Checkout.showLightbox();
  }

  changeShowValue() {
    this.travelerService.changeStatusShowValue();

  }
  // checkMail() {
  //   // let result = true;
  //   const email = this.customForm.value.emailAddress;
  //   this.validation.checkMail(email).subscribe(res => {
  //     const key = 'smtp_check';
  //     this.mail = res[key];
  //   });
  // }
  convertDate(dateAge) {
    let d = new Date(dateAge),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
  }
  checkId() {
    const dob = this.convertDate(this.customForm.value.dateBirth);
    const id = this.customForm.value.id.toString();
    const dyear = dob.substring(2, 4);
    const idYear = id.substring(1, 3);
    const dmonth = dob.substring(5, 7);
    const dday = dob.substring(8, 10);
    const idMonth = id.substring(3, 5);
    const idDay = id.substring(5, 7);
    if (idYear !== dyear || idMonth !== dmonth || idDay !== dday) {
      this.cid = false;
    } else {
      this.cid = true;
      // const data = {paramlist: {filter: [['national_id', '=', id]], need: ['issue_date']}};
      // this.odoo.call_odoo_function('travel_agency', 'online', 'online',
      // 'policy.travel', 'search_read', data ).subscribe(res => {
      //   const key = 'issue_date';
      //   console.log(res);
      //   if (res[0]) {
      //   const issueDate = res[0][key].substring(0, 10);
      //   const today = new Date();
      //   const strDate = this.convertDate(today);
      //   if (issueDate === strDate) {
      //     this.isFirstPolicy = false;
      //   }
      //   console.log(strDate);
      //   console.log(issueDate);
      // }
      // });
    }

  }
  showField(event) {
    const valueField = event.value;
    if (valueField === 'egyptian') {
      this.isEgyptian = true;

    } else {
      this.isEgyptian = false;
    }
  }

}
