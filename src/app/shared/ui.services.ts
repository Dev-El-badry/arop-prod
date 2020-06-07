import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class UIService {
  loadingChangedStatus = new Subject<boolean>();
  loadResId = new Subject<any[]>();


  constructor(private snakbar: MatSnackBar) {}

  snackbar(msgError, action, durationTime) {
    this.snakbar.open(msgError, action, {
      duration: durationTime
    });
  }
}
