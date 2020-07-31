import { Component, OnInit } from '@angular/core';
import {DownloadQueueService} from "../download-queue.service";
import {VideoService} from "../video.service";
import {DownloadQueue} from "../downloadQueue";
import {timer} from "rxjs";
import {take} from "rxjs/operators";
import {LocationsService} from "../locations.service";
import {LocationJS} from "../model/LocationJS";
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-fila-download',
  templateUrl: './fila-download.component.html',
  styleUrls: ['./fila-download.component.scss']
})
export class FilaDownloadComponent implements OnInit {

  constructor(private downloadQueue: DownloadQueueService, private videoService: VideoService, private locationService: LocationsService, private uploadService: UploadService) { }

  listQueue : DownloadQueue[];
  pageUrl: string;
  downloadUrl: string;
  locationId: number;
  listLocation: LocationJS[];
  selectedQueue: DownloadQueue;

  getClass(queue: DownloadQueue){
    return  {'far fa-play-circle': queue.inProgress==1,'fa fa-stop-circle': queue.inProgress==0};
  }

  selecionar(queue: DownloadQueue){
    this.selectedQueue = queue;
    this.pageUrl = queue.pageUrl;
    this.downloadUrl = queue.videoUrl;
  }

  adicionarAFila(){
    this.uploadService.addToDownloadQueue(this.pageUrl,this.downloadUrl,this.locationId).subscribe(retorno=>{
      this.pageUrl = '';
      this.downloadUrl = '';
      this.locationId = null;
      console.log("Adicionado");
    });
  }

  private updateFila(){
    this.downloadQueue.getListAll().subscribe(retorno => {
      //console.log(this.listQueue);
      this.listQueue = retorno['data'];
    });
  }
  processarColetor(){
    this.downloadQueue.atualizarColetor().subscribe(retorno => {
      this.updateFila();
    });
  }

  updateQueueItem(){
    this.selectedQueue.pageUrl = this.pageUrl;
    this.selectedQueue.videoUrl = this.downloadUrl;
    this.selectedQueue.inProgress = 0;
    this.selectedQueue.idLocation = this.locationId;
    this.selectedQueue.failed = 0;
    this.selectedQueue.situacao = 'Re-Adicionado'
    this.selectedQueue.finished = 0;
    this.downloadQueue.update(this.selectedQueue.id,this.selectedQueue).subscribe(retorno =>{
      console.log('updating...');
    });
  }

  refreshLocations(){
    this.locationService.getListAll().subscribe(retorno=> {
      this.listLocation = retorno.data;
    });
  }

  ngOnInit(): void {
    this.updateFila();
    this.refreshLocations();
    timer(1000, 10000).subscribe(x=>{
      this.updateFila();
    });
  }

}
