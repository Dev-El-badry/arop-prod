import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SiteSettingsService } from 'src/app/shared/site_settings.service';

@Component({
  selector: 'app-individual-medical',
  templateUrl: './individual-medical.component.html',
  styleUrls: ['./individual-medical.component.css']
})
export class IndividualMedicalComponent implements OnInit {
  @Input() form: FormGroup;
  minDate;
  constructor(private site_settings: SiteSettingsService) { }

  ngOnInit() {
    this.minDate = this.site_settings.getDateInYears(18);
  }

}
