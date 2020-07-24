import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Constants } from './constants';
import {PesquisaJS} from "./model/PesquisaJS";
import {PesquisaAvancadaJS} from "./model/PesquisaAvancadaJS";
import {VideoModel} from "./model/videoModel";
import {VideoJS} from "./videoJS";

@Injectable({
  providedIn: 'root'
})
export class VideoService {


  url = Constants.getApiUrl()+'/video';
  constructor(private http: HttpClient) { }

  getListTypes() {
    return this.http.get(this.url+"/type/");
  }

  setField(idVideo:string,field: string,value: string) {
    return this.http.post(this.url+"/"+idVideo+"/set/"+field+"/"+value,{});
  }

  updateHistory(idVideo: string) {
    return this.http.put(this.url+"/updateHistory/"+idVideo, {});
  }

  buscar(pesquisaJS: PesquisaJS){
    return this.http.post(this.url+"/busca",pesquisaJS);
  }

  buscaAvancada(pesquisaAvancadaJS: PesquisaAvancadaJS){
    return this.http.post(this.url+"/buscaAvancada",pesquisaAvancadaJS);
  }

  saveVideo(videoModel: VideoModel){
    return this.http.post(this.url+"/adicionarVideo",videoModel);
  }

  novo(videoJS: VideoJS){
    return this.http.post(this.url+"/novo",videoJS);
  }

  uploadFile(path, formData){
    return this.http.post(path,formData);
  }

  lastBusca(){
    return this.http.get(this.url+"/lastBusca");
  }

  addToDownloadQueue(pageUrl: string, downloadUrl: string) {
    return this.http.post(this.url+"/addURLv2",{
      'pageUrl': pageUrl,
      'downloadUrl': downloadUrl
    });
  }

  recreate(code: string) {
    return this.http.get(`${this.url}/recreate/${code}`);
  }

  getListVideo() {
    return this.http.get(this.url+"/type/all/100");
  }

  getListVideoByType(type: string, page: string) {
    if(page){
      return this.http.get(this.url+"/type/"+type+"/100/"+page);
    }else{
      return this.http.get(this.url+"/type/"+type+"/100");
    }

  }

  getInfo(idVideo: string) {
    return this.http.get(this.url+"/"+idVideo);
  }
}
