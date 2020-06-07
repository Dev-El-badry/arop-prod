import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TravelerService } from '../traveler-info/traveler.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-personal-result',
  templateUrl: './personal-result.component.html',
  styleUrls: ['./personal-result.component.css']
})
export class PersonalResultComponent implements OnInit {
  infoStatus = false;
  isCompleted = false;
  travelerInfoStatus = false;
  paymentStatus = false;
  secondFormGroup: FormGroup;
  isShow: boolean;
  subscription: Subscription;
  direction;
  selectedIndex: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private travelerService: TravelerService
  ) {
    this.isShow = false;
  }

  ngOnInit() {
    this.subscription = this.travelerService.getShowValue()
      .subscribe(item => this.isShow = item);
    console.log(this.isShow);


    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }
  onResize(event) {
    console.log('yeah', event);
    this.direction = event.target.innerWidth <= 1000 ? 'column' : 'row';
  }

  goForward(stepper: MatStepper, event) {

    this.infoStatus = true;
    setTimeout(() => {
      if (this.infoStatus) { stepper.next(); }
    }, 100);

  }
  goForwardToPayment(stepper: MatStepper, event) {
    console.log('yes');
    this.travelerInfoStatus = true;
    setTimeout(() => {
      if (this.travelerInfoStatus) { stepper.next(); }
    }, 100);

  }

  goForwardToDone(stepper: MatStepper, event) {
    console.log('yes');
    this.paymentStatus = true;
    setTimeout(() => {
      if (this.paymentStatus) { stepper.next(); }
    }, 100);

  }


  setIndex(event) {
    this.selectedIndex = event.selectedIndex;
  }

  triggerClick() {
    if(this.selectedIndex === 0) {
      console.log('remove');
      localStorage.removeItem('stepper');
    }
    console.log(`Selected tab index: ${this.selectedIndex}`);
  }

  ngOnDestroy() {
    console.log('component destroy');
    let myItem = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', myItem);

    let script = document.querySelector("#myscript");
    script.removeAttribute("data-complete");
    
  }

}

