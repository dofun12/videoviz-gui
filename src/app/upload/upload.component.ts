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

  constructor(private videoService: VideoService, private locationService: LocationsService) {
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.total = this.uploadedFiles.length;
  }

  refreshLocations() {
    this.locationService.getListAll().subscribe(retorno => {
      this.locations = retorno.data;
    });
  }

  salvar(salvarTudo: boolean) {
    this.videoService.novo(this.videoModel).subscribe((retorno: JsonResponse) => {
      this.videoModel = retorno.data;
      this.idVideo = this.videoModel.idVideo;
      if (salvarTudo) {
        this.upload();
      }
    });
  }


  upload() {
    this.runQueue(0);
  }

  private runQueue(queue: number){
    const file = this.uploadedFiles[queue];
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("idLocation", '' + this.idLocation);
    this.videoService.uploadFile(this.getUploadUrl(), formData).subscribe(retorno=>{
      console.log('Receiving...', retorno.data);
      this.queue++;
      this.afterUploadList.push(retorno.data[0]);
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

  getImage(context: string,code: string) {
    return Constants.getImageUrl(context,code);
  }

  getUploadUrl() {
    return environment.apiUrlDireto + '/upload/sendFile';
  }

  ngOnInit(): void {
    this.refreshLocations();
  }

}
