import {
  Component,
  OnInit,
  Output,
  AfterViewChecked,
  EventEmitter,
  Renderer2,
  Inject
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { NgForm, NgModel } from "@angular/forms";
import { OdooService } from "src/app/shared/odoo.service";
import { TravelerService } from "../traveler.service";
import { PaymentModel } from "../payment.model";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY"
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class PaymentComponent implements OnInit, AfterViewChecked {
  paymentForm: PaymentModel;
  loadAPI: Promise<any>;
  addScript: boolean = false;

  @Output() paymentStatus = new EventEmitter();
  qnbConfig ;
  constructor(
    private odoo: OdooService,
    private travelerService: TravelerService,
    private _render2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    //amount, name, adress, email, phone
 
    this.paymentForm = this.travelerService.paymentForm;
    console.log("", this.paymentForm);

    
    // let script = this._render2.createElement('script');
    // script.type = `application/ld+json`;
    // script.src = "https://qnbalahli.test.gateway.mastercard.com/checkout/version/55/checkout.js";
  }
  
 onPay() {
    var handler = (<any>window).Checkout.configure({
            merchant: 'TESTQNBAATEST001',
        order: {
            amount: function() {
                //Dynamic calculation of amount
                return 80 + 20;
            },
            currency: 'EGP',
            description: 'Ordered goods',
            id: ''
        },
        interaction: {
            merchant: {
                name: 'Your merchant name',
                address: {
                    line1: '200 Sample St',
                    line2: '1234 Example Town'
                },
                email: 'order@yourMerchantEmailAddress.com',
                phone: '+1 123 456 789 012',
                logo: 'https://aropeegypt.com.eg/Property/wp-content/uploads/2019/10/Logoz-3.jpg'
            },
            locale: 'en_US',
            theme: 'default',
            displayControl: {
                billingAddress: 'HIDE',
                customerEmail: 'HIDE',
                orderSummary: 'SHOW',
                shipping: 'HIDE'
            }
        }
    });
 
    handler.showLightbox();
    }

    ngAfterViewChecked() {
     
      
    }

  
  submitPayment(form: NgForm) {
    console.log("ay kalam");
    if (form.valid) {
      console.log("ay kalam 1");
      const formData = JSON.parse(localStorage.getItem("formData"));
      const data = { paramlist: formData };
      this.odoo
        .call_odoo_function(
          "travel_agency",
          "online",
          "online",
          "travel.front",
          "create_policy",
          data
        )
        .subscribe(res => {
          console.log("res", res);
          this.paymentStatus.emit(true);
        });
    }
  }
}
