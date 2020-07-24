import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class TagsService {


  url = Constants.getApiUrl()+'/tag';
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(this.url+"/");
  }

  getListAll() {
    return this.http.get(this.url+"/all");
  }

  get(id: string) {
    return this.http.get(this.url+"/"+id);
  }

  getVideoTags(idVideo: string) {
    return this.http.get(this.url+"/video/"+idVideo);
  }

  addVideoTags(idVideo: string,idTag:string) {
    console.log("addVideoTags",idVideo,idTag);
    return this.http.post(this.url+"/video/"+idVideo+"/"+idTag,{});
  }

  removeVideoTags(idVideo: string,idTag:string) {
    console.log("removeVideoTags",idVideo,idTag);
    return this.http.delete(this.url+"/video/"+idVideo+"/"+idTag);
  }
}

