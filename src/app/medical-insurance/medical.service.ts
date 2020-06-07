import { Injectable } from '@angular/core';
import { OdooService } from '../shared/odoo.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class MedicalService {
    private _types: object[] = [
        { value: 'spouse', viewValue: 'Spouse' },
        { value: 'kid', viewValue: 'Kid' }
      ];

    private _groupSizes = [

      { viewValue: '0 - 17', value: 10 },
      { viewValue: '18 - 24', value: 20 },
      { viewValue: '25 - 29', value: 27 },
      { viewValue: '30 - 34', value: 32 },
      { viewValue: '35 - 39', value: 37 },
      { viewValue: '40 - 44', value: 42 },
      { viewValue: '45 - 49', value: 47 },
      { viewValue: '50 - 54', value: 52 },
      { viewValue: '55 - 59', value: 57 },
      { viewValue: '60 - 64', value: 62 },
    ];


    loadMedicalInfo = new Subject<any>();
    constructor(private odooService: OdooService, private router: Router) {}
    get lang() { return localStorage.getItem('lang'); }
    get Types() {
        return this._types;
    }

    get GroupSizes() {
        return this._groupSizes;
    }


    getTabels(type: string, dob: any) {
        let resultObj;
        if (type === 'individual') {
          resultObj = {
              type,
              dob: [dob],
              lang: this.lang
          };
        } else if (type === 'family') {
          resultObj = {
              type,
              dob,
              lang: this.lang
          };
        } else if (type === 'smes') {
          resultObj = {
            type: 'sme',
            dob,
            lang: this.lang
        };
        }

        const dataList = {
            paramlist: {
              data: resultObj
            }
          };
        console.log('datelist', dataList);
        return this.odooService.call_odoo_function('travel_agency', 'online', 'online', 'medical.api',
          'get_price', dataList).subscribe(res => {
            console.log(res);
            this.loadMedicalInfo.next(res);
            console.log('HERE', JSON.stringify(res));
          });
    }

    convertStringInArrayToInteger(listArr: Array<any>) {
      const newArr = [];
      for (const i in listArr) {
          newArr.push({
            age: parseInt(listArr[i].age),
            num: parseInt(listArr[i].num)
          });
        }

      return newArr;
  }

    // mutableDataCovers() {
    //     const data = []
    // }

    onClickPlan(plan: string) {
      this.router.navigate(['personal-accident'], {queryParams: {page: 'medical-insurance', plan}});
    }

}
