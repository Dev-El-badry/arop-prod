import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OdooService } from "src/app/shared/odoo.service";
import { Router, ActivatedRoute } from "@angular/router";
import { group } from "@angular/animations";
import { ValidationService } from "src/app/shared/validation.service";

@Component({
  selector: "app-group-ticket",
  templateUrl: "./group-ticket.component.html",
  styleUrls: ["./group-ticket.component.css"]
})
export class GroupTicketComponent implements OnInit {
  breakpoint;
  isLoading = false;
  mail: boolean;
  constructor(
    private odoo: OdooService,
    private router: Router,
    private validation: ValidationService,
    private routerActivated: ActivatedRoute
  ) {}
  isHere:boolean = false;
  dateOfBirth: string;
  job: number;
  sum_insured: number;
  @ViewChild("fInfo", { static: false }) customForm: NgForm;
  ngOnInit() {
    this.routerActivated.paramMap.subscribe(paramMap=> {
      if(paramMap.has('dateOfBirth') && paramMap.has('job') && paramMap.has('sum_insured')) {
        this.isHere = true;
        this.dateOfBirth = paramMap.get('dateOfBirth');
        this.job = parseInt(paramMap.get('job'));
        this.sum_insured = parseInt(paramMap.get('sum_insured'));
      }
    })
  }
  submitForm(form: NgForm) {
    const groups = JSON.parse(localStorage.getItem("groupMembers"));
    let obj;
    if(this.isHere) { 
      obj = {
        type: "pa",
          job: form.value.job,
          name: form.value.name,
          phone: form.value.prefixNum + form.value.phoneNumber,
          mail: form.value.emailAddress,
          sum_insured: this.sum_insured,
          date: this.dateOfBirth
      }
    } else {
      obj = {
        group: groups,
        type: "travel",
        name: form.value.name,
        phone: form.value.prefixNum + form.value.phoneNumber,
        mail: form.value.emailAddress
      }
    }

    const data = {
      paramlist: {
        data: {
          obj
        }
      }
    };

    this.odoo
      .call_odoo_function(
        "travel_agency",
        "online",
        "online",
        "ticket.api",
        "create_ticket",
        data
      )
      .subscribe(res => {
        this.router.navigate(["/thanks"]);
      });
  }
  onResize(event) {
    console.log("yeah", event);
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }

  // checkMail(val) {
  //   // let result = true;
  //   this.validation.checkMail(val).subscribe(res => {
  //     console.log(res);
  //     const key = 'smtp_check';
  //     this.mail = res[key];
  //     console.log(this.mail);
  //   });
  // }
}
