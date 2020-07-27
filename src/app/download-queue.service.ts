import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {HttpClient} from "@angular/common/http";
import {DownloadQueue} from "./downloadQueue";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class DownloadQueueService {

  url = Constants.getApiUrl()+'/downloadQueue';
  constructor(private http: ApiService) { }

  getListAll() {
    return this.http.get(this.url+"/");
  }

  getById(id: number) {
    return this.http.get(this.url+"/"+id);
  }

  atualizarColetor() {
    return this.http.get(this.url+"/atualizarColetor");
  }

  update(id: number, downloadQueue: DownloadQueue) {
    return this.http.put(this.url+"/"+id,downloadQueue);
  }

}
