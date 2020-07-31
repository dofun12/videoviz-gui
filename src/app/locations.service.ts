import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {ApiService} from "./api.service";
import {Playlist} from "./model/Playlist";
import {VideoPlaylist} from "./model/VideoPlaylist";


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  url = Constants.getApiUrl()+'/locations';
  constructor(private http: ApiService) { }

  getListAll() {
    return this.http.get(this.url+"/");
  }

  adicionar(location: Location) {
    return this.http.post(this.url+"/",location);
  }

  get(idLocation: number) {
    return this.http.get(this.url+"/"+idLocation);
  }

  edit(idLocation: number) {
    return this.http.put(this.url+"/",location);
  }

  delete(idLocation: number) {
    return this.http.delete(this.url+"/"+idLocation);
  }

}
