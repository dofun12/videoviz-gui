import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {VideoService} from "../video.service";
import {Constants} from "../constants";
import {HTMLVideo} from "../HTMLVideo";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  videoPlayer: HTMLVideoElement;
  @Input() videoSrc: string;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    console.log("setting videoElement")
    this.videoPlayer = el.nativeElement;
    this.videoPlayer.addEventListener("timeupdate", this.onTimeUpdate);
  }
  currentTime: number;
  duration: number;
  seeking: boolean;






  autoplay: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private videoService: VideoService) {
  }


  ngOnInit() {

  }

  onTimeUpdate(){
    if(this.videoPlayer && !this.seeking){
      this.currentTime = this.videoPlayer.currentTime;
      this.duration = this.videoPlayer.duration;
    }

  }

  onPlayPause() {
    console.log(this.videoPlayer.currentTime);
    if (this.videoPlayer.paused) {
      this.videoPlayer.play();
    } else {
      this.videoPlayer.pause();
    }
  }
  onLoaded() {
    this.videoPlayer.play();
  }

  onAdvanceTenSeconds() {
    this.videoPlayer.currentTime = this.videoPlayer.currentTime + 10;
  }

  onBackTenSeconds() {
    this.videoPlayer.currentTime = this.videoPlayer.currentTime - 10;
  }
}
