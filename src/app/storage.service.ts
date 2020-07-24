import { Injectable } from '@angular/core';
import {VSession} from "./model/VSession";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static KEY_LASTVIDEO = 'lastVideo'
  static KEY_TIME = StorageService.KEY_LASTVIDEO+'-time';
  static KEY_ID_VIDEO = StorageService.KEY_LASTVIDEO+'-idvideo';
  static KEY_LAST_TYPE = 'lasttype';
  static KEY_LAST_PAGE = 'lastpage';
  static KEY_IS_BUSCA = 'isbusca';

  store(vsession: VSession){
    this.put(StorageService.KEY_ID_VIDEO,''+vsession.idVideo);
    this.put(StorageService.KEY_TIME,''+vsession.currentTime);
    this.put(StorageService.KEY_LAST_TYPE,''+vsession.lastType);
    this.put(StorageService.KEY_LAST_PAGE,''+vsession.lastPage);
    this.put(StorageService.KEY_IS_BUSCA,''+vsession.isBusca);
  }

  storeItem(key: string,value: any){
    this.put(key, ''+value);
  }

  getAsInt(key: string): number{
    return Number(this.get(key));
  }

  restore(): VSession {
    let vsession: VSession = new VSession();
    vsession.currentTime = this.getAsInt(StorageService.KEY_TIME);
    vsession.idVideo = this.getAsInt(StorageService.KEY_ID_VIDEO);
    vsession.lastType = this.get(StorageService.KEY_LAST_TYPE);
    vsession.lastPage = this.get(StorageService.KEY_LAST_PAGE);
    vsession.isBusca = (this.get(StorageService.KEY_IS_BUSCA) == 'true');
    return vsession;
  }

  clear(): void{
    localStorage.removeItem(StorageService.KEY_ID_VIDEO);
    localStorage.removeItem(StorageService.KEY_TIME);
  }

  private put(key: string,value: string): void{
    localStorage.setItem(key,value);
  }

  get(key: string): string{
    return localStorage.getItem(key);
  }
}
