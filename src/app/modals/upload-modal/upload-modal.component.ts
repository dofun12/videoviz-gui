import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {VideoService} from "../../video.service";
import {LocationsService} from "../../locations.service";
import {LocationJS} from "../../model/LocationJS";
import {VideoJS} from "../../videoJS";
import {environment} from "../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadItem} from "../../uploadItem";

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

  constructor(private videoService: VideoService,
              private locationService: LocationsService, public activeModal: NgbActiveModal) { }

  @Output() onQueueAdd = new EventEmitter<string>();
  @Output() onQueueRemove = new EventEmitter<string>();
  @Output() onUpload = new EventEmitter<string>();

  idVideo: number = null;
  idLocation: number = null;
  resposta: string;
  uploaded = false;
  locations: LocationJS[];
  queue = 0;
  total = 0;
  videoModel = new VideoJS();
  //afterUploadList:VideoJS[] = [];
  uploadedFiles: Array<File>;

  getUploadUrl() {
    return environment.apiUrlDireto + '/upload/sendFile';
  }

  refreshLocations() {
    this.locationService.getListAll().subscribe(retorno => {
      this.idLocation = retorno.data[0].idLocation;
      this.locations = retorno.data;
    });
  }

  ngOnInit(): void {
    this.refreshLocations();
  }


  upload() {
    this.runQueue(0);
    this.activeModal.close();
    if(this.uploadedFiles && this.uploadedFiles.length == 0){
      return;
    }
    for(let file of this.uploadedFiles){
      this.onQueueAdd.emit(file.name);
    }
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.total = this.uploadedFiles.length;
  }

  private runQueue(queue: number){
    const file = this.uploadedFiles[queue];
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("idLocation", '' + this.idLocation);


    this.videoService.uploadFile(this.getUploadUrl(), formData).subscribe(retorno=>{
      for(let received of retorno.data){
        this.onQueueRemove.emit(received.title);
      }
      this.queue++;

      this.onUpload.emit(retorno.data);
      if(this.total>this.queue){
        this.runQueue(this.queue);
      }else{
        this.uploadedFiles = [];
      }
    }) , (error) =>{
      console.log("upload error");
    };
  }

}
