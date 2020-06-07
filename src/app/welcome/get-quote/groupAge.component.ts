import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { WelcomeService } from '../welcome.service';
import { SiteSettingsService } from '../../shared/site_settings.service';
@Component({
  selector: 'app-group-age',
  template: `
    <form #fDialog="ngForm" (ngSubmit)="submitFormAges(fDialog)">

      <div mat-dialog-content>
        <div *ngFor="let element of elements; let i = index">
          <span id="field-{{ i }}">
            <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="1%" dir="auto">
              <div *ngIf="i >= 0; then thenBlock;"></div>
              <ng-template #thenBlock>
                <div
                  style="color: #565656;  line-height: 63px;   font-size:14px;margin-top: 11px !important;font-weight: normal;"
                  fxFlex="15%"
                >
                  {{'group.group'|translate}} {{i + 1}}:
                </div>
              </ng-template>


              <!-- Start Secion ranges -->
              <div *ngIf="!result || result; then thenBlock1;"></div>
              <ng-template #thenBlock1>
                <div ngModelGroup="ranges" fxFlex="25%" [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }">
                  <mat-form-field>
                    <mat-label>{{'medical.age'|translate}}</mat-label>
                    <mat-select
                      name="range-{{ i }}"
                      ngModel
                      [ngModel]="dataList.ranges['range-' + i]"
                      #range="ngModel"
                      required
                    >
                      <mat-option
                        *ngFor="let range of ranges"
                        [value]="range.value"
                      >
                        {{ range.viewValue }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </ng-template>

              <!-- End Section ranges -->
              <!-- Start Section sizes -->

              <div ngModelGroup="sizes" fxFlex="25%" [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }">

                <div class="form-group" >

                <mat-form-field
                  class="form-age-traveler"
                  style="
                  width: 162px;"
                >


                  <!-- Input size -->

                  <input
                    type="text"
                    matInput
                    placeholder="GroupSize"
                    [ngModel]="dataList.sizes['size-' + i]"
                    name="size-{{ i }}"
                    #ages="ngModel"
                    required
                  />
                  <!-- End Input size -->

                </mat-form-field>
                <!-- End mat-form-field -->
                </div> <!-- End .form-group -->

              </div>
              <!-- End Section sizes -->
              <!-- Start Section Delete Field-->
              <div
                fxFlex="10%"
                [ngClass]="{'margin-right-fix': lang=='en', 'margin-left-fix': lang=='ar' }"
                style="   cursor: pointer;"
                (click)="deleteElement(i)"
                *ngIf="i != 0"
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
        >
          <span
            class="mdi mdi-plus"
            style="    font-size: 15px;"
            icon-margin
          ></span>
          {{'traveler.add_group' | translate}}
          
        </div>
        <div fxFlex fxLayout fxLayoutAlign="flex-end">
          <button
            mat-button
            type="submit"
            style="background-color: #073E89;
            color: #E4EAF2;"
            [disabled]="fDialog.invalid"
          >
            {{'traveler.done' | translate}}
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [
    ".margin-right-fix:not(:last-child) { margin-right: 70px !important }; button.margin-right-fix.mat-raised-button.mat-button-base.mat-warn.ng-star-inserted { max-width: 7% !important } .margin-left-fix:not(:last-child) { margin-left: 70px !important }"
  ]
})
export class GroupAgeComponent implements OnInit {
  elements = [];
  result;
  ranges = [
    { value: 5, viewValue: '0 - 10' },
    { value: 15, viewValue: '11 - 18' },
    { value: 25, viewValue: '19 - 70' },

  ];
  dataList = {
    sizes: '',
    ranges: ''
  };
  isShow: boolean;
  constructor(
    private dialogRef: MatDialogRef<GroupAgeComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData,
    private welcomeService: WelcomeService,
    private site_settings: SiteSettingsService
  ) {}

  ngOnInit() {
    const result = this.site_settings.isEmpty(this.passedData);

    if (result) {
      console.log(this.passedData.sizesList, 'newjson');
      const newJson = JSON.parse(this.passedData.sizesList);
      const genJson = JSON.parse(newJson);

      for (const sizeItem in genJson.sizes) {
        this.elements.push(this.elements.length);
      }

      this.dataList.sizes = genJson.sizes;
      this.dataList.ranges = genJson.ranges;
    } else {
      this.elements.push(this.elements.length);
    }
    this.result = result;
    console.log('result', result);
  }
  get lang() { return localStorage.getItem("lang"); }


  clickMe() {
    this.elements.push(this.elements.length);
  }

  submitFormAges(form: NgForm) {
    const listValue = {
      sizes: form.value.sizes,
      ranges: form.value.ranges
    };
    this.welcomeService.setListDates(listValue);
    this.dialogRef.close();
  }

  deleteElement(index: number) {
    const target_id = 'field-' + index;
    const element_id = document.getElementById(target_id);
    element_id.parentNode.removeChild(element_id);
  }
}
