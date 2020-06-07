import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
declare let FawryPay: any;
@Component({
    selector: "app-stop-training",
    template: `
  

        <h3>{{'payment.title' | translate}}</h3>
      
        <mat-nav-list>
            <mat-list-item (click)="onFawery()">
            

            <a matLine href="#" target="_blank">
               <input type="image"  src="https://www.atfawry.com/assets/img/FawryPayLogo.jpg"/>

               <span>{{'payment.fawery' | translate}}</span>
            </a>
            <!-- <h4 matline> info </h4> -->
            </mat-list-item>
            <mat-divider></mat-divider>
              <mat-list-item >
            <a matLine href="#" target="_blank">
                {{'payment.qnb' | translate}}
            </a>
            <!-- <h4 matline> info </h4> -->
            </mat-list-item>
        </mat-nav-list>
      
  `,
    styles: [
`
        input {
                width: 80px;
    padding-top: 11px;
        }

        a>span {
                  text-align: center;
    padding-right: 21px;
    font-size: 20px;
    position: relative;
    top: -16px;
        }
`
    ]
})
export class PaymentDialogComponent implements OnInit {
    // @ViewChild('fDialog', { static: false }) fDialog: NgForm;
    
    constructor(
        private dialogRef: MatDialogRef<PaymentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public passedData,
       
    ) { }

    ngOnInit() {
    }

    onFawery() {
        const chargeRequest = { "language": "ar-eg", "merchantCode": "is0N+YQzlE4=", "merchantRefNumber": "12333", "customer": { "name": "test user", "mobile": "0100739xxx", "email": "test@test.com", "customerProfileId": "8723871236" }, "order": { "description": "test bill inq", "expiry": "2", "orderItems": [{ "productSKU": "12222", "description": "Test Product", "price": "50", "quantity": "2", "width": "10", "height": "5", "length": "100", "weight": "1" }] }, "signature": "243d69d005ba46943c5f8d590cf7f8ad6c02663a838ca5b7039c33e03ad10799" };
        const successPageUrl = '#';
        const failerPageUrl = 'http://localhost:4200/personal-accident/';
        FawryPay.loadFawryPluginPopup();
    }
}
