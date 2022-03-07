import { Component, OnInit } from '@angular/core';
import {VideoSimple} from "../video-simple";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {VSession} from "../model/VSession";
import {PlaylistService} from "../playlist.service";
import {Playlist} from "../model/Playlist";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  lista: Playlist[];
  playlistName: string;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.listarPlaylists();
  }

  listarPlaylists() {
    this.playlistService.getListAll().subscribe(retorno => {
      console.log(retorno);
        if(retorno.success){
          this.lista = retorno.data;
          console.log('foi',this.lista);
        }
    });
  }

  abrirPlaylist(playlist){
    this.router.navigate(['/playlist/'+playlist.idPlaylist]);
  }

  save(){
    let play = new Playlist();
    play.name = this.playlistName;
    this.playlistService.adicionar(play).subscribe(retorno => {
        this.listarPlaylists();
    });
  }





}
