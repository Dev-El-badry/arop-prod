import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from '../brand.model';
import { CarInsuranceService } from '../car-insurance.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs/Rx';

@Component({
  selector: 'app-car-quote',
  templateUrl: './car-quote.component.html',
  styleUrls: ['./car-quote.component.css']
})
export class CarQuoteComponent implements OnInit, OnDestroy {
  breakpoint;
  brands: Brand[];
  deductibleRate;
  breackdown;
  price;
  country;
  type;
  options;
  years: string[] = [];
  todayYear;
  /** control for the MatSelect filter keyword */
  public brandFilterCtrl: FormControl = new FormControl();
  constructor(private carService: CarInsuranceService, private router: Router) { }
  private _onDestroy = new Subject<void>();
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  ngOnInit() {
    this.brands = this.carService.Brands;
    this.brands.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    this.filteredRecords.next(this.brands.slice());
    this.brandFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        console.log('12346');
        this.filterBrands();
      });
    this.todayYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      const x = this.todayYear - i;
      this.years.push(x.toString());
    }

    this.breakpoint = window.innerWidth <= 700 ? 1 : 2;

  }

  submitForm(form: NgForm) {
    if ( !form.valid) {
      return;
    }

    const brandCar = this.carService.getValueBrand(Number(form.value.brandCar));
   
    if (form.value.type == 'General') {
     
    this.router.navigate(['/', 'car-insurance', 'insurance-info',
    brandCar, form.value.brand, form.value.type,
     form.value.price]);
    } else {
      this.router.navigate(['/', 'car-insurance', 'insurance-info',
      brandCar, form.value.brand, form.value.type,
      form.value.price]);
    }
  }

  checkDeductibleRateOptions(form: NgForm) {
    this.price = form.value.price;
    this.country = form.value.brand;
    this.type = form.value.type;
    if (this.country === 'chinese cars & east asia' || this.type === 'Total Loss Only' ) {
      return false;
    } else {
      return true;
    }
  }
  private filterBrands() {
    if (!this.brands) {
      console.log('if1');
      return;
    }
    // get the search keyword
    let search = this.brandFilterCtrl.value;
    if (!search) {
      this.brands = this.carService.Brands;
      console.log('if2');
      return;
    } else {
      console.log('else');
      search = search.toLowerCase();
      console.log(search);
      this.brands = this.brands.filter(brand => brand.title.toLowerCase().indexOf(search) > -1);
    }
    this.brands = this.carService.Brands;
    this.brands = this.brands.filter(brand => brand.title.toLowerCase().indexOf(search) > -1);
  }

  onResize(event) {

    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
    // this.breakpoint2 = event.target.innerWidth <= 700 ? 1 : 3;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
