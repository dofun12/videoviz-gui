import {Component, OnInit} from '@angular/core';
import {VideoService} from "../video.service";
import {Constants} from "../constants";
import {VideoJS} from "../videoJS";
import {LocationsService} from "../locations.service";
import {LocationJS} from "../model/LocationJS";
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
  afterUploadList: VideoJS[] = [];
  beforeUploadList: string[];
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

  openUploadModal() {
    const modalRef = this.modalManagerService.openUploadModal();
    this.beforeUploadList = [];
    modalRef.componentInstance.onQueueAdd.subscribe((uuidResponse: string) => {
      console.log('Trying add.... ', uuidResponse);
      const filtred = this.beforeUploadList.filter(value => (value === uuidResponse));
      if(filtred && filtred.length > 0){
        console.log('Rejected.... ', uuidResponse, filtred);
        return;
      }
      console.log('Added.... ', uuidResponse);
      this.beforeUploadList.push(uuidResponse);
    });
    modalRef.componentInstance.onUpload.subscribe((videosJS: VideoJS[]) => {
      console.log('Opa saindo do forno', videosJS);
      for (const v of videosJS) {
        this.afterUploadList.push(v);
      }
    });
    modalRef.componentInstance.onQueueRemove.subscribe((uuidResponse: string) => {
      const filtred = this.beforeUploadList.filter( tmpUuid => tmpUuid !== uuidResponse);
      this.beforeUploadList = filtred;
    });
  }

  openEditModal(idVideo: number) {
    this.modalManagerService.openVideoEditModal(idVideo);
  }

  refresh() {
    console.log(this.afterUploadList);
  }

  getImage(context: string, code: string) {
    return Constants.getImageUrl(context, code);
  }


  ngOnInit(): void {
  }

}
