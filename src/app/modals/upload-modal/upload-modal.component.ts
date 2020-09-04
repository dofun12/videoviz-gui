import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {VideoService} from "../../video.service";
import {LocationsService} from "../../locations.service";
import {LocationJS} from "../../model/LocationJS";
import {VideoJS} from "../../videoJS";
import {environment} from "../../../environments/environment";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

  constructor(private videoService: VideoService,
              private locationService: LocationsService, public activeModal: NgbActiveModal) { }

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
      this.locations = retorno.data;
    });
  }

  ngOnInit(): void {
    this.refreshLocations();
  }


  upload() {
    this.runQueue(0);
    this.activeModal.close();
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
      console.log('Receiving...', retorno.data);
      this.queue++;

      this.onUpload.emit(retorno.data);
      if(this.total>this.queue){
        this.runQueue(this.queue);
      }else{
        this.uploadedFiles = [];
        console.log("This is the end");
      }
    }) , (error) =>{
      console.log("upload error");
    };
  }

}
