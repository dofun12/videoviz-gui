import { Injectable } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EditVideoModalComponent} from "./modals/edit-video-modal/edit-video-modal.component";
import {UploadModalComponent} from "./modals/upload-modal/upload-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalManagerService {

  constructor(private modal: NgbModal) {}

  openVideoEditModal(idVideo: number): void{
    const modalRef = this.modal.open(EditVideoModalComponent);
    modalRef.componentInstance.idVideo = idVideo;
  }

  openUploadModal(): NgbModalRef{
    return this.modal.open(UploadModalComponent);
  }



}
