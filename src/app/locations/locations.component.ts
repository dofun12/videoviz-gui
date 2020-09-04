import {Component, OnInit} from '@angular/core';
import {LocationsService} from "../locations.service";
import {LocationJS} from "../model/LocationJS";
import {GenericModalComponent} from "../generic-modal/generic-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LocationsModalComponent} from "./locations-modal.component";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private locationService: LocationsService, private modalService: NgbModal) {
  }

  locations: LocationJS[];

  ngOnInit(): void {
    this.refresh();
  }

  edit(location:LocationJS){
    this.openModal('edit',location);
  }

  refresh(){
    this.locationService.getListAll().subscribe(retorno => {
      if (retorno.success) {
        this.locations = retorno.data;
      } else {
        this.locations = [];
      }
    });
  }

  novo(){
    this.openModal('new',new LocationJS());
  }

  private openModal(operation: string, locationJS: LocationJS) {
    const modalRef = this.modalService.open(LocationsModalComponent);
    modalRef.componentInstance.operation = operation;
    modalRef.componentInstance.location = locationJS;
    modalRef.result.then(retorno => {
      if(retorno.operation === 'edit'){

      }else if(retorno.operation === 'new'){
        this.locationService.adicionar(retorno.location).subscribe( retorno => {
          this.refresh();
        });
      }

    });
  }


}
