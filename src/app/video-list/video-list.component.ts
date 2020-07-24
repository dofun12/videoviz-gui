import {Component, OnInit} from '@angular/core';
import {VideoService} from "../video.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router, UrlSegment} from "@angular/router";
import {VideoSimple} from "../video-simple";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {VSession} from "../model/VSession";
import {environment} from "../../environments/environment";
import {Constants} from "../constants";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  listVideo: VideoSimple[] = [];
  type: string = null;
  page: string = '0';
  imageUrl: string;

  constructor(private videoService: VideoService, private route: ActivatedRoute,
              private router: Router,private session:Session,private storage: StorageService) {
    this.router.events.subscribe((val)=>{
      let theType = this.route.snapshot.paramMap.get('type');
      this.page = this.route.snapshot.paramMap.get('page');
      if(theType && this.type!= theType){
        console.log("INFO",theType);
        this.type = this.route.snapshot.paramMap.get('type');
        this.initType();
     }

    });
  }

  ngOnInit() {
    this.imageUrl = environment.remoteImageUrl;

  }

  getImageURL(code: string){
    return Constants.getImageUrl(code);
  }

  play(idVideo: number){
    this.storage.clear();
    let vsession: VSession = new VSession();
    vsession.lastType = this.type;
    vsession.lastPage = this.page;
    vsession.idVideo = idVideo;
    vsession.isBusca = false;
    this.storage.store(vsession);
    this.router.navigate(['/play/id/'+idVideo]);
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
