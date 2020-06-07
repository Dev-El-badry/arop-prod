import { Component, OnInit , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.css']
})
export class ListNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeSideNav.emit();
  }
}
