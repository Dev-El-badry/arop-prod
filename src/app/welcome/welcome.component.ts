import { Component, OnInit } from "@angular/core";
declare let Checkout: any;
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {

  qnbConfig = {
      merchant: 'TESTQNBAATEST001',
      order: {
          amount: function() {
              //Dynamic calculation of amount
              return 110 + 20;
          },
          currency: 'EGP',
          description: 'Ordered goods',
        id: ''
      },
        interaction: {
          merchant      : {
          name   : 'Your merchant name',
          address: {
                        line1: '200 Sample St',
                        line2: '1234 Example Town'            
          },
          email  : 'order@yourMerchantEmailAddress.com',
          phone  : '+1 123 456 789 012',
          logo   : 'https://imageURL'
          },
          locale        : 'en_US',
          theme         : 'default',
          displayControl: {
              billingAddress  : 'HIDE',
              customerEmail   : 'HIDE',
              orderSummary    : 'SHOW',
              shipping        : 'HIDE'
            }
          }
  };
  constructor() {}
  ngOnInit() {}


  onClick() {
    Checkout.showLightbox({
      onCancel: function() {
        console.log('error');
      }
    });
  }



}
