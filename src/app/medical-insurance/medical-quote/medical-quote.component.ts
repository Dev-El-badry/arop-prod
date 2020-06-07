import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { MedicalService } from '../medical.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup , FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-medical-quote',
  templateUrl: './medical-quote.component.html',
  styleUrls: ['./medical-quote.component.css']
})
export class MedicalQuoteComponent implements OnInit {
  minDate: Date;
  num = 1;
  numGroup = 1;
  type = 'individual';
  form: FormGroup;



  constructor(
    private site_settings: SiteSettingsService,
    private medicalService: MedicalService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {

    this.createForm();

  }

  getVal(val)  {
    this.type = val;

    if (val === 'family') {
      this.form = new FormGroup({
        dates: new FormArray([
          new FormControl('', [Validators.required])
        ])
      });
    } else if (val === 'individual') {
      this.form = new FormGroup({
        date: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        })

      });
    } else if (val === 'smes' || val === 'corporate') {
      this.form = new FormGroup({
        groups: this.fb.array([
          this.fb.group({
            age: '',
            num: ''
          })
        ])
      });
    }

    console.log('new form', this.form);
  }

  createForm() {
    console.log(this.type);

    if (this.type === 'individual') {
      this.form = new FormGroup({
        date: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        })

      });

      // end form individual
    } else if (this.type === 'family') {
      this.form = new FormGroup({
        dates: new FormArray([
          new FormControl('', [Validators.required])
        ])
      });
    } else if (this.type === 'smes' || this.type === 'corporate') {

      this.form = new FormGroup({
        groups: this.fb.array([
          this.fb.group({
            age: '',
            num: ''
          })
        ])
      });

    }


  }



  get dates(): FormArray { return this.form.get('dates') as FormArray; }
  get groups(): FormArray { return this.form.get('groups') as FormArray; }

  onIncrement() {
    this.dates.push(new FormControl(''));
  }
  onIncrementGroup() {
    this.groups.push(this.fb.group({
      age: '',
      num: ''
    }));
  }

  onRequest() {

    if (!this.form.valid) {
      return;
    }

    if (this.type === 'family') {
      const date = [];
      for (const dob in this.form.value.dates) {
        date.push(this.site_settings.convertDate(this.form.value.dates[dob]));
        this.medicalService.getTabels(this.type, date);
        const date_str = date.join(',');
        this.router.navigate(['/', 'medical-insurance', 'medical-info'], {queryParams: {type: this.type, date: date_str}});
      }
      this.medicalService.getTabels(this.type, date);
    } else if (this.type === 'individual') {
      const date = this.site_settings.convertDate(this.form.value.date);
      this.medicalService.getTabels(this.type, date);
      this.router.navigate(['/', 'medical-insurance', 'medical-info'], {queryParams: {type: this.type, date}});
    } else if (this.type === 'smes') {
      const newArr = this.medicalService.convertStringInArrayToInteger(this.form.value.groups);
      this.medicalService.getTabels(this.type, newArr);
      let target_url = '';
      for (const ele in newArr) {


          if (!target_url) {
            target_url = JSON.stringify(newArr[ele]);
          } else {
            target_url += '-' + JSON.stringify(newArr[ele]);
          }

      }
      this.router.navigate(['/', 'medical-insurance', 'medical-info'], {queryParams: {type: this.type, date: target_url}});
    } else if (this.type === 'corporate') {
        localStorage.setItem('medicalType', 'corporate');
        this.router.navigate(['get_ticket']);
    }


    // this.router.navigate(['medical-info'], {queryParams: {type: this.form.value.type, date: date}});
  }

}
