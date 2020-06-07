import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { WelcomeService } from '../../welcome/welcome.service';
import { MatStepper } from '@angular/material';
import { UIService } from '../../shared/ui.services';
import { Router, ActivatedRoute } from '@angular/router';
// declare var Checkout: any;
@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent implements OnInit {
  totalPrice;
  priceLoadSubs: Subscription;
  isLoading = false;
  isLoadingSubs: Subscription;
  isDisabled = false;
  loadPriceSubs: Subscription;
  type;
  stepper : boolean;
  @Output() clicked = new EventEmitter();

  constructor(
    private welService: WelcomeService,
    private uiService: UIService,
    private router: Router,
    private routerActivated: ActivatedRoute
  ) {

  }

  ngOnInit() {
      //params query 
  this.routerActivated.queryParamMap.subscribe(param => {

    //start code
    if(param.has('step')) {
      console.log('text', param.get('step'));
      this.clicked.emit(true);
    }
    
  });

  if (localStorage.getItem("stepper") === null) {
    this.stepper = false;
  } else if(Boolean(localStorage.getItem("stepper")) === true) {
    this.stepper = true;
  }

    this.type = localStorage.getItem('type');

    this.totalPrice = localStorage.getItem('total_price');
    // this.loadPriceSubs = this.welService.priceLoad.subscribe(result => {
    //   console.log(result);
    //   this.totalPrice = result;
    // });
    console.log('total price', this.totalPrice);
    this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;

    });

    this.welService.getValuePrice();
  }

  goNextStepper() {

    this.isDisabled = true;
    this.clicked.emit(true);
    window.scrollTo(0, 0);

    // localStorage.setItem('stepper', 'true');
  }



  ngOnDestroy() {
    if (this.loadPriceSubs) { this.loadPriceSubs.unsubscribe(); }
    if (this.isLoadingSubs) { this.isLoadingSubs.unsubscribe(); }
  }

}

