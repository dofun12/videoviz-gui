import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {VideoService} from "../video.service";
import {VideoModel} from "../model/videoModel";
import {JsonResponse} from "../model/JsonResponse";
import {VideoSimple} from "../video-simple";
import {Constants} from "../constants";
import {VideoJS} from "../videoJS";
import {LocationsService} from "../locations.service";
import {LocationJS} from "../model/LocationJS";
import {Observable,  ConnectableObservable} from "rxjs";
import {concatAll} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditVideoModalComponent} from "../modals/edit-video-modal/edit-video-modal.component";
import {ModalManagerService} from "../modal-manager.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  idVideo: number = null;
  idLocation: number = null;
  resposta: string;
  uploaded = false;
  locations: LocationJS[];
  queue = 0;
  total = 0;
  videoModel = new VideoJS();
  afterUploadList:VideoJS[] = [];
  uploadedFiles: Array<File>;

  constructor(
    private videoService: VideoService,
    private locationService: LocationsService,
    private modalManagerService: ModalManagerService
  ) {
  }



  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.total = this.uploadedFiles.length;
  }

  openUploadModal(){
    const modalRef = this.modalManagerService.openUploadModal();
    modalRef.componentInstance.onUpload.subscribe((videosJS: VideoJS[]) => {
      console.log('Opa saindo do forno', videosJS);
      for(const v of videosJS){
        this.afterUploadList.push(v);
      }
    });
  }

  openEditModal(idVideo: number){
    this.modalManagerService.openVideoEditModal(idVideo);
  }

  refresh(){
    console.log(this.afterUploadList);
  }

  getImage(context: string,code: string) {
    return Constants.getImageUrl(context,code);
  }


  ngOnInit(): void {
  }

}
