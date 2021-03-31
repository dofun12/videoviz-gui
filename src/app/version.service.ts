import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  url = Constants.getApiUrl()+'/version';
  constructor(private http: ApiService) { }

  getVersion(){
    return this.http.get(this.url+"/");
  }
}
