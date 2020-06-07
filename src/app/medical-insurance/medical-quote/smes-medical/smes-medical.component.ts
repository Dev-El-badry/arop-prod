import { Component, OnInit, Input } from '@angular/core';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { MedicalService } from '../../medical.service';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-smes-medical',
  templateUrl: './smes-medical.component.html',
  styleUrls: ['./smes-medical.component.css']
})
export class SmesMedicalComponent implements OnInit {
  groupSize;
  @Input() numGroup: FormArray;
  @Input() form: FormGroup;
  constructor(private site_settings: SiteSettingsService, private medicalService: MedicalService) { }

  ngOnInit() {
    this.groupSize = this.medicalService.GroupSizes;
  }

  // getCount() {
  //   return this.site_settings.convertToArray(this.numGroup);
  // }

  deleteElement(index: number) {
    const ele = document.getElementById('field-'+index);
    ele.parentNode.removeChild(ele);
  }

}
