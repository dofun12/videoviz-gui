import {Component, OnInit} from '@angular/core';
import {LocationJS} from "../model/LocationJS";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-locations',
  templateUrl: './locations-modal.component.html'
})
export class LocationsModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  operation: string;
  location: LocationJS;

  ngOnInit(): void {
  }

  closeModal(): void {
    this.activeModal.close({location: this.location, operation: this.operation});
  }

}
