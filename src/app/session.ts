import { Injectable } from '@angular/core';
import {VideoSimple} from "./video-simple";
@Injectable()
export class Session {
  lastVideos:  VideoSimple[] = [];
  mostrarMenu: boolean = true;
  closeMenu(){
    this.mostrarMenu = false;
  }

  mostrarEsconderMenu(){
    console.log('teste');
    this.mostrarMenu = (!this.mostrarMenu);
  }
}
