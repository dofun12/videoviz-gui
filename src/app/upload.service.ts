import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = Constants.getApiUrl()+'/upload';
  constructor(private http: ApiService) { }


  addToDownloadQueue(pageUrl: string, downloadUrl: string, idLocation: number) {
    return this.http.post(this.url+"/addURLv2",{
      'pageUrl': pageUrl,
      'downloadUrl': downloadUrl,
      'idLocation': idLocation,
    });
  }
}
