import { Component, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-smes-table',
  templateUrl: './smes-table.component.html',
  styleUrls: ['./smes-table.component.css']
})
export class SmesTableComponent implements OnInit {
  displayedColumns: string[] = ['cover', 'Golden', 'Platinum', 'Diamond', 'Diamond_Elite'];
  @Input() objMedicalInfo: any;
  @Input() stepper: MatStepper;
  infoStatus = false;
  constructor() { }

  ngOnInit() {
    // this.objMedicalInfo.map(row=> {
    //   console.log(row.plans);
    // })

    // console.log(this.objMedicalInfo);
    console.log('here2', this.objMedicalInfo);
  }


  chkIfTrueOrFalse(val) {
    if(typeof(val) == 'boolean') {

      if(val == true) {
        return true;
      } else {
        return false;
      }

    } else if(val == '') {
      return 'ـــ';
    } else {
      return val;
    }
  }


  goToNextStepper(page: string, planType: string) {
    localStorage.setItem('planType', planType);
    console.log('HERE', planType);
    this.infoStatus = true;

    setTimeout(() => {
      if(this.infoStatus) { this.stepper.next(); }
    }, 100);

  }


}
