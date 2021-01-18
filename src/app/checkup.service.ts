import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CheckupService {

  constructor(private http: ApiService) { }

  url = Constants.getApiUrl()+'/checkup';

  public validadeLinks(value: string){
    return this.http.post(this.url+"/validadeLinks",value)
  }
}
