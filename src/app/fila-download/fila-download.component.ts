import { Component, OnInit } from '@angular/core';
import {DownloadQueueService} from "../download-queue.service";
import {VideoService} from "../video.service";
import {DownloadQueue} from "../downloadQueue";
import {timer} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-fila-download',
  templateUrl: './fila-download.component.html',
  styleUrls: ['./fila-download.component.scss']
})
export class FilaDownloadComponent implements OnInit {

  constructor(private downloadQueue: DownloadQueueService, private videoService: VideoService) { }

  listQueue : DownloadQueue[];
  pageUrl: string;
  downloadUrl: string;
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
    this.videoService.addToDownloadQueue(this.pageUrl,this.downloadUrl).subscribe(retorno=>{
      this.pageUrl = '';
      this.downloadUrl = '';
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
    this.selectedQueue.failed = 0;
    this.selectedQueue.situacao = 'Re-Adicionado'
    this.selectedQueue.finished = 0;
    this.downloadQueue.update(this.selectedQueue.id,this.selectedQueue).subscribe(retorno =>{
      console.log('updating...');
    });
  }

  ngOnInit(): void {
    this.updateFila();
    timer(1000, 10000).subscribe(x=>{
      this.updateFila();
    });
  }

}
