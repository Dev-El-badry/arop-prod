import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  travel = true;
  personal = false;
  tree: UrlTree;
  urlTarget = '';
  constructor(private router: Router, private location: Location) { }
  ngOnInit() {
  }

  get lang() { return localStorage.getItem('lang'); }
  chkIsUrl(url) {
    this.tree = this.router.parseUrl(this.location.path());
    this.urlTarget = this.tree.root.children.primary.segments[0].path;

    if (url === this.urlTarget) { return true; } else { return false; }
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
  goToPersonalAccident() {
    this.travel = false;
    // this.router.navigate(['/personal-accident']);
    this.personal = true;
  }
  goToTravel() {
    this.personal = false;
    // this.router.navigate(['']);
    this.travel = true;
  }
  goToMedical() {
    this.personal = false;
    // this.router.navigate(['medical-insurance']);
    this.travel = false;
  }
  goToMotor() {
    this.personal = false;
    // this.router.navigate(['car-insurance']);
    this.travel = false;
  }
}
