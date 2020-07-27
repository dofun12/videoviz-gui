import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {HttpClient} from "@angular/common/http";
import {JsonResponse} from "./model/JsonResponse";
import {Playlist} from "./model/Playlist";
import {Tag} from "./model/Tag";
import {VideoPlaylist} from "./model/VideoPlaylist";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  url = Constants.getApiUrl()+'/playlist';
  constructor(private http: ApiService) { }

  getListAll() {
    return this.http.get(this.url+"/");
  }

  adicionar(playlist: Playlist) {
    return this.http.post(this.url+"/",playlist);
  }

  adicionarVideo(videoPlaylist: VideoPlaylist) {
    return this.http.post(this.url+"/addVideo",videoPlaylist);
  }
}
