import { Component, OnInit, Input } from '@angular/core';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';
import { MedicalService } from '../../medical.service';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-family-medical',
  templateUrl: './family-medical.component.html',
  styleUrls: ['./family-medical.component.css']
})
export class FamilyMedicalComponent implements OnInit {
  @Input() datesCount: FormArray;
  @Input() form: FormGroup;

  types;
  minDate;
  maxRelaseDate;
  constructor(private site_settings: SiteSettingsService, private medicalService: MedicalService) { }

  ngOnInit() {
    this.types = this.medicalService.Types;
    this.minDate = this.site_settings.getDateInYears(18);
    // this.maxRelaseDate = new Date();
    // this.maxRelaseDate.setDate(this.maxRelaseDate.getDate() - 0);
  }

  deleteElement(index: number) {
    const ele = document.getElementById('field-' + index);
    ele.parentNode.removeChild(ele);
  }

}
