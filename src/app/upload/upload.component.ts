import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {VideoService} from "../video.service";
import {VideoModel} from "../model/videoModel";
import {JsonResponse} from "../model/JsonResponse";
import {VideoSimple} from "../video-simple";
import {Constants} from "../constants";
import {VideoJS} from "../videoJS";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  idVideo: number = null;
  resposta: string;
  videoModel = new VideoJS();
  uploadedFiles: Array<File>;

  constructor(private videoService: VideoService) { }

  fileChange(element){
    this.uploadedFiles = element.target.files;
  }

  salvar(salvarTudo: boolean){
    this.videoService.novo(this.videoModel).subscribe((retorno: JsonResponse) => {
      this.videoModel = retorno.data;
      this.idVideo = this.videoModel.idVideo;
      if(salvarTudo){
        this.upload();
      }
    });
  }

  upload(){
    if(this.idVideo!=null){
      let formData = new FormData();
      for(var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.videoService.saveVideo(this.videoModel).subscribe((retorno: JsonResponse)=> {
        this.videoModel = retorno.data;
        this.idVideo = this.videoModel.idVideo;
        this.videoService.uploadFile(this.getUploadUrl(), formData).subscribe((retorno: JsonResponse)=>{
          return this.videoModel = retorno.data;
        });
      });
    }


  }

  getImage(code: string){
    return Constants.getImageUrl(code);
  }

  getUploadUrl(){
    return environment.apiUrlDireto+'/video/adicionarArquivo/'+this.idVideo;
  }

  ngOnInit(): void {
  }

}
