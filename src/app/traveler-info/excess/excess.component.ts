import { Component, OnInit, OnDestroy } from '@angular/core';
import { OdooService } from 'src/app/shared/odoo.service';
import { TravelerService } from '../traveler.service';
import { UIService } from '.././../shared/ui.services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-excess',
  templateUrl: './excess.component.html',
  styleUrls: ['./excess.component.css']
})
export class ExcessComponent implements OnInit, OnDestroy {
  resObjExcess;
  displayedColumns: string[] = ['rule', 'amount'];
  loadResObjExcessSub;
  isLoading = false;
  isLoadingSubs: Subscription;
  constructor(private odoo: OdooService, private uiService: UIService, private travelerService: TravelerService) {
  }

  ngOnInit() {
    this.loadResObjExcessSub = this.travelerService.loadResObjExcess.subscribe(
      result => {
        this.resObjExcess = result;
      }
    );
    this.isLoadingSubs = this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });
    this.getAllTransaction();

    this.uiService.loadingChangedStatus.subscribe(res => {
      this.isLoading = res;
    });
  }

  getAllTransaction() {
    this.travelerService.fetchExcess();
  }

  ngOnDestroy() {
    if (this.loadResObjExcessSub) { this.loadResObjExcessSub.unsubscribe(); }
    if (this.isLoadingSubs) { this.isLoadingSubs.unsubscribe(); }
  }

}
