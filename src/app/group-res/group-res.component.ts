import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-group-res',
  templateUrl: './group-res.component.html',
  styleUrls: ['./group-res.component.css']
})
export class GroupResComponent implements OnInit {
  infoStatus = false;
  travelerInfoStatus = false;
  constructor() { }

  ngOnInit() {
  }

  goForward(stepper: MatStepper, event){

    this.infoStatus = true;
    setTimeout(() => {
      if(this.infoStatus) { stepper.next(); }
    }, 100);

  }

  goForwardToPayment(stepper: MatStepper, event) {
    
    this.travelerInfoStatus = true;
    setTimeout(() => {
      if(this.travelerInfoStatus) { stepper.next(); }
    }, 100);

  }


}
