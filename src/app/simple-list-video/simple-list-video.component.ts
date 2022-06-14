import {Component, Input, OnInit} from '@angular/core';
import {VideoSimple} from "../video-simple";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {environment} from "../../environments/environment";
import {Constants} from "../constants";
import {VSession} from "../model/VSession";

@Component({
  selector: 'app-simple-list-video',
  templateUrl: './simple-list-video.component.html',
  styleUrls: ['./simple-list-video.component.scss']
})
export class SimpleListVideoComponent implements OnInit {
  @Input() playlistName = 'Sem nome';
  @Input() sourceUrl = '/play/id';
  @Input() mylistVideo: VideoSimple[] = [];
  listVideo: VideoSimple[] = [];
  type: string = null;
  page: string = '0';
  imageUrl: string;

  constructor(private videoService: VideoService, private route: ActivatedRoute,
              private router: Router,private session:Session,private storage: StorageService) {

  }

  ngOnInit() {
    this.imageUrl = environment.remoteImageUrl;

  }

  getImageURL(context: string,code: string){
    return Constants.getImageUrl(context,code);
  }

  play(idVideo: number){
    this.storage.clear();
    let vsession: VSession = new VSession();
    vsession.lastType = this.type;
    vsession.lastPage = this.page;
    vsession.idVideo = idVideo;
    vsession.isBusca = false;
    this.storage.store(vsession);
    this.router.navigate([this.sourceUrl+'/'+idVideo]);
  }

  initType(){
    this.videoService.getListVideoByType(this.type,this.page).subscribe(resp => {
      localStorage.setItem("lastype",this.type);
      localStorage.setItem("lastpage",this.page);
      console.log('loading videos',resp);
      this.listVideo = resp['data'];
      this.session.lastVideos = resp['data'];
    });
  }

}
