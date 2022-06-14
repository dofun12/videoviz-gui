import { Component, OnInit } from '@angular/core';
import {VideoSimple} from "../video-simple";
import {VideoService} from "../video.service";
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {VSession} from "../model/VSession";
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.component.html',
  styleUrls: ['./playlist-videos.component.scss']
})
export class PlaylistVideosComponent implements OnInit {
  idPlaylist = null;
  videoList = [];
  sourceUrl = null;
  constructor(private playlistService: PlaylistService,private videoService: VideoService,private route: ActivatedRoute,private router: Router){
    router.events.forEach((event) => {
      if (event instanceof ActivationEnd ) {
        const activation:ActivationEnd = event;
        this.idPlaylist = activation.snapshot.params.idPlaylist;
        console.log(activation.snapshot.params);
      } else
      if (event instanceof NavigationEnd ) {
        this.iniciar();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  iniciar(){
    console.log(this.idPlaylist);
    if(this.idPlaylist){
      this.sourceUrl = '/play/playlist/'+this.idPlaylist;
      this.videoService.getListByPlaylist(this.idPlaylist).subscribe( response=>  {
        console.log(response);
        this.videoList = response.data;
        console.log('videolist',this.videoList);
      });
    }
  }

  ngOnInit() {

  }


}
