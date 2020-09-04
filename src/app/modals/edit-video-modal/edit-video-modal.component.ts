import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VideoService} from "../../video.service";
import {VideoJS} from "../../videoJS";

@Component({
  selector: 'app-edit-video-modal',
  templateUrl: './edit-video-modal.component.html',
  styleUrls: ['./edit-video-modal.component.scss']
})
export class EditVideoModalComponent implements OnInit {
  @Input() idVideo:  number;

  public videoInfo: VideoJS = new VideoJS();

  constructor(public activeModal: NgbActiveModal, private videoService: VideoService) { }

  ngOnInit(): void {
    this.loadVideo(this.idVideo);
  }

  loadVideo(idVideo: number){
    this.videoService.getInfo(idVideo.toString()).subscribe(response => {
      this.videoInfo = response.data;
    })
  }

  onEdit(){
    this.videoService.update(this.videoInfo).subscribe(retorno => {
      if(retorno.success){
        this.activeModal.close();
      }
    });
  }

}
