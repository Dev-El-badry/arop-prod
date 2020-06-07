import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from '@angular/forms';
import { WelcomeService } from '../welcome.service';
import { SiteSettingsService } from '../../shared/site_settings.service';


// FORMATE DATE
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: "app-stop-training",
  template: `
  

    <form #fDialog="ngForm" (ngSubmit)="submitFormAges(fDialog)">

      <div mat-dialog-content>
        <div *ngFor="let element of elements; let i = index">
          <span id="field-{{ i }}" class="selectDiv">
            <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="1%" dir="auto">
              <div *ngIf="i == 0; then thenBlock; else elseBlock"></div>
              <ng-template #thenBlock>
                <div
                  style="color: #565656;     font-size:14px;
              margin-top: 11px !important;
              font-weight: normal;"
                  fxFlex="21%"
                >

                  {{ 'traveler.key1' | translate }}
                </div>
              </ng-template>
              <ng-template #elseBlock>
                <div
                  style="color: #565656;     font-size:14px;margin-top: 11px !important;font-weight: normal;"
                  fxFlex="30%"
                >
                {{ 'traveler.key2' | translate }}

                </div>
              </ng-template>



              <!-- Start Section Dates -->

              <div ngModelGroup="dates" fxFlex="20%" [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }">


                <div class="form-group" *ngIf="i == 0">
                <!-- start mat-from-field -->

                <mat-form-field
                  class="form-age-traveler"
                  style="
                  width: 162px;"

                >
                  <!-- Input Date -->

                  <input
                    type="text"
                    matInput
                    [matDatepicker]="picker"
                   placeholder="Birth Of Date"
                    [ngModel]="dataList.dates['date-' + i]"
                    name="date-{{ i }}"
                    #ages="ngModel"
                    [max]="maxDateKid"
                    required
                  />
                  <!-- End Input Date -->

                  <mat-datepicker-toggle
                    matSuffix
                    [for]="picker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker
                    #picker
                    [startAt]="dataList.dates['date-' + i]"
                    startView="multi-year"
                  ></mat-datepicker>
                </mat-form-field>
                <!-- End mat-form-field -->
                </div> <!-- End .form-group --> <!-- i === 0 -->



                <div class="form-group" *ngIf="i > 0">

                <!-- Start IF Condition -->

                <!-- start mat-from-field -->
                <mat-form-field
                  class="form-age-traveler"
                  style="
                  width: 162px;"
                  *ngIf="fDialog.value.types['type-'+i] === 'kid'"

                >


                  <!-- Input Date -->

                  <input
                    type="text"
                    matInput
                    [matDatepicker]="picker"
                   placeholder="Birth Of Date"
                    [ngModel]="dataList.dates['date-' + i]"
                    name="date-{{ i }}"
                    #ages="ngModel"
                    [max]="minDate"
                    [min]="maxDateKid"
                    required

                  />
                  <!-- End Input Date -->

                  <mat-datepicker-toggle
                    matSuffix
                    [for]="picker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker
                    #picker
                    [startAt]="dataList.dates['date-' + i]"
                    startView="multi-year"
                  ></mat-datepicker>
                </mat-form-field>
                <!-- End mat-form-field -->

                <!-- Start mat-form-field -->
                <mat-form-field
                  class="form-age-traveler"
                  style="
                  width: 162px;"
                 *ngIf="fDialog.value.types['type-'+i] === 'spouse'"

                >


                  <!-- Input Date -->

                  <input
                    type="text"
                    matInput
                    [matDatepicker]="picker"
                   placeholder="Birth Of Date"
                    [ngModel]="dataList.dates['date-' + i]"
                    name="date-{{ i }}"
                    #ages="ngModel"
                    [max]="maxDateKid"

                    required
                  />
                  <!-- End Input Date -->

                  <mat-datepicker-toggle
                    matSuffix
                    [for]="picker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker
                    #picker
                    [startAt]="dataList.dates['date-' + i]"
                    startView="multi-year"
                  ></mat-datepicker>
                </mat-form-field>
                <!-- End mat-form-field -->


                <!-- End If Condition -->
                <!-- start mat-from-field -->
                <mat-form-field
                  class="form-age-traveler"
                  style="
                  width: 162px;"
                  *ngIf="!fDialog.value.types['type-'+i]"

                >


                  <!-- Input Date -->

                  <input
                    type="text"
                    matInput
                    [matDatepicker]="picker"
                   placeholder="Birth Of Date"
                    [ngModel]="dataList.dates['date-' + i]"
                    name="date-{{ i }}"
                    #ages="ngModel"
                    [max]="minDate"
                    [disabled]="!fDialog.value.types['type-'+i]"
                    required

                  />
                  <!-- End Input Date -->

                  <mat-datepicker-toggle
                    matSuffix
                    [for]="picker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker
                    #picker
                    [startAt]="dataList.dates['date-' + i]"
                    startView="multi-year"
                  ></mat-datepicker>
                </mat-form-field>
                <!-- End mat-form-field -->
                </div> <!-- End .form-group -->

              </div>
              <!-- End Section Dates -->







              <!-- Start Secion Types -->
              <div *ngIf="!result; then thenBlock1; else elseBlock1"></div>
              <ng-template #thenBlock1>
                <div ngModelGroup="types" fxFlex="20%" [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }" >
                  <mat-form-field *ngIf="i != 0">
                    <mat-label>{{ 'traveler.type' | translate }}</mat-label>
                    <mat-select
                      name="type-{{ i }}"
                      ngModel
                      #type="ngModel"
                      required
                    >
                      <mat-option
                        *ngFor="let type of types"
                        [value]="type.value"
                      >
                        {{ type.viewValue }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </ng-template>
              <ng-template #elseBlock1>
                <div ngModelGroup="types" fxFlex="20%" [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }" >
                  <mat-form-field *ngIf="i != 0">
                  <mat-label>{{ 'traveler.type' | translate }}</mat-label>
                    <mat-select
                      name="type-{{ i }}"
                      [(ngModel)]="dataList.types['type-' + i]"
                      #type="ngModel"
                      required
                    >
                      <mat-option
                        *ngFor="let type of types"
                        [value]="type.value"
                      >
                        {{ type.viewValue }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </ng-template>

              <!-- End Section Types -->

              <!-- Start Section Delete Field-->
              <div
                fxFlex="10%"

                [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }"
                style="   cursor: pointer;"
                (click)="deleteElement(i)"
                *ngIf="i > 2"
                type="button"
                color="warn"
              >
                <mat-icon
                  style="    margin: 18px;
                    line-height: 10px;
                    padding: 2px;
                    border-radius: 5px;
                    background: salmon;
                }"
                  >minimize</mat-icon
                >
              </div>

              <!-- End Section Delete Field -->
            </div>
          </span>
        </div>
      </div>
      <div mat-dialog-actions>

        <div
          style="cursor: pointer; color: #565656"
          onMouseOver="this.style.color='#073e89'"
          onMouseOut="this.style.color='#565656'"
          (click)="this.clickMe()"
          fxLayout
          fxLayoutAlign="flex-start"
          *ngIf="showBtn"
          class="add-additional-traveler"
        >
          <span
            class="mdi mdi-plus"
            style="    font-size: 15px;"
            icon-margin
            mat-button-raised
          ></span>
          {{ 'traveler.add_addtional' | translate }}

        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end">
          <button
            mat-button
            type="submit"
            style="background-color: #073E89;
            color: #E4EAF2;"
            [disabled]="fDialog.invalid"
          >

            {{ 'traveler.done' | translate }}
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [
    ".margin-right-fix:not(:last-child) { margin-right: 70px !important }; button.margin-right-fix.mat-raised-button.mat-button-base.mat-warn.ng-star-inserted { max-width: 7% !important } .margin-left-fix:not(:last-child) { margin-left: 70px !important }"
  ],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AgeTravelerComponent implements OnInit {
  @ViewChild('fDialog', {static: false}) fDialog: NgForm;
  elements = [0, 1];
  minDate;
  maxDateKid;
  result;
  showBtn: boolean = true;
  types = [
    {value: 'spouse', viewValue: 'Spouse'},
    {value: 'kid', viewValue: 'Kid'}
  ];
  dataList = {
    dates: "",
    types: ""
  };
  isShow: boolean;
  constructor(
    private dialogRef: MatDialogRef<AgeTravelerComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData,
    private welcomeService: WelcomeService,
    private site_settings: SiteSettingsService,
    private dateAdapter: DateAdapter<Date>,
    private translate: TranslateService
  ) {}

  ngOnInit() {


    if (this.lang === 'en') {
      this.dateAdapter.setLocale('en');
    } else if (this.lang === 'ar') {
      this.dateAdapter.setLocale('ar');
    }
    this.minDate = this.welcomeService.getMinDateBefore30Days();
    this.maxDateKid = this.site_settings.getDateInYears(18);
    const result = this.site_settings.isEmpty(this.passedData);

    if (result) {
      this.elements = [];
      console.log(this.passedData.datesList, 'newjson');
      const newJson = JSON.parse(this.passedData.datesList);
      const genJson = JSON.parse(newJson);

      for (const dateItem in genJson.dates) {
        this.elements.push(this.elements.length);
      }

      this.dataList.dates = genJson.dates;
      this.dataList.types = genJson.types;
    } else {
      this.elements.push(this.elements.length);
    }
    this.result = result;

    // console.log('result', this.elements);
  }

  get lang() { return localStorage.getItem("lang"); }

  clickMe() {
    this.elements.push(this.elements.length);
    // this.toggleBtn();
    // console.log('result', this.elements);
  }

  submitFormAges(form: NgForm) {
    for (const age in form.value.dates) {
      form.value.dates[age] = this.site_settings.convertDate(
        form.value.dates[age]
      );
    }
    const listValue = {
      dates: form.value.dates,
      types: form.value.types
    };
    this.welcomeService.setListDates(listValue);
    this.dialogRef.close();
  }

  deleteElement(index: number) {
    const target_id = 'field-' + index;
    const element_id = document.getElementById(target_id);
    element_id.parentNode.removeChild(element_id);

    console.log('form updated', this.fDialog.value);
    const type_str = "type-" + index;
    const date_str = "date-" + index;

    delete this.fDialog.value.types[type_str];
    delete this.fDialog.value.dates[date_str];

    console.log('valid', this.fDialog.valid);
    // this.elements = this.elements.filter(item => item != index);
    // this.elements = this.elements.filter(item=> item != index);
    this.toggleBtn();
  }

  toggleBtn() {
    const countEle = document.querySelectorAll('.selectDiv');

    if (countEle.length === 5) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  }

  setLocale(val) {
    console.log(val);
    this.dateAdapter.setLocale(val);
  }
}
