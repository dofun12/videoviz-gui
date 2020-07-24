import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {VideoService} from "../video.service";
import {Constants} from "../constants";
import {Session} from "../session";
import {JsonResponse} from "../model/JsonResponse";
import {VideoDetails} from "../model/VideoDetails";
import {TagsService} from "../tags.service";
import {Tag} from "../model/Tag";
import {Tab} from "../model/Tab";
import {Star} from "../model/Star";
import {Item} from "../model/Item";
import {VideoSimple} from "../video-simple";
import {StorageService} from "../storage.service";
import {interval, Observable} from "rxjs";
import {PlaylistService} from "../playlist.service";
import {Playlist} from "../model/Playlist";
import {VideoPlaylist} from "../model/VideoPlaylist";


@Component({
  selector: 'app-video-session',
  templateUrl: './video-session.component.html',
  styleUrls: ['./video-session.component.scss']
})
export class VideoSessionComponent implements OnInit {
  videoPlayer: HTMLVideoElement;
  @Input() videoSrc: string;

  @ViewChild('videoElement', { static: true })
  set mainVideoEl(el: ElementRef) {

    this.videoPlayer = el.nativeElement;
    this.videoPlayer.addEventListener("timeupdate", this.onTimeUpdate);
  }

  menuTitle: string;
  fullscreen: boolean = false;
  idVideo: string;
  videoDetails: VideoDetails;
  videoTags: Tag[];
  tabs: Tab[] = [
    {tabname: 'info', description: "Info", selected: true},
    {tabname: 'tags', description: "Tags", selected: false},
    {tabname: 'fila', description: "Fila", selected: false},
    {tabname: 'config', description: "Config", selected: false}
  ];

  currentTime: number;
  duration: number;
  seeking: boolean;
  position: number;
  totalTags =  0;
  rating: number;
  autoplay: boolean = true;
  starsSelected: Star[] = [];
  infoListItem: Item[] = [];
  lastVideos: VideoSimple[] = [];
  keyLastVideo: string = 'lastVideo';
  lastUrl = null;
  imageUrl = null;
  playLista: Playlist[];
  started: boolean = true;

  constructor(private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router,
              private videoService: VideoService,
              public session: Session,
              private storage: StorageService,
              private tagService: TagsService) {
    router.events.forEach((event) => {
      if (event instanceof ActivationEnd ) {
        const activation:ActivationEnd = event;
        this.idVideo = activation.snapshot.params.idVideo;
      } else
        if (event instanceof NavigationEnd ) {
        const eventEnd:NavigationEnd = event;
        if(eventEnd.url !== this.lastUrl){
          console.log('Change');
          this.iniciar();
          this.lastUrl = eventEnd.url;
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  } ///mnt/d/Program\ Files/nodejs/node_modules/npm/bin/

  isSelected(idVideo: number): boolean {
    return ((idVideo + '') == this.idVideo);
  }

  recreate(code: string){
    return this.videoService.recreate(code).subscribe((retorno: JsonResponse) => {
      if(retorno.success){
        this.imageUrl = retorno.data;
      }
    });
  }

  getInfo(idVideo: string) {
    window.scrollTo(0, 0);
    this.videoService.getInfo(idVideo).subscribe((value: JsonResponse) => {
      const videoDetails: VideoDetails = value.data;
      this.videoDetails = videoDetails;
      this.imageUrl = Constants.getImageUrl(videoDetails.code);
      this.loadStars(videoDetails.rating);
      this.videoSrc = Constants.getVideoUrl(this.videoDetails.code);
      this.menuTitle = videoDetails.title;
      this.infoListItem = [];
      const keys: string[] = Object.keys(videoDetails);
      let index = 0;
      for (let key of keys) {
        this.infoListItem.push({key: '' + index, description: key, value: videoDetails[key]});
        index++;
      }
    });
    this.getListVideoTags(this.idVideo);
  }

  play(idVideo: string) {
    this.idVideo = idVideo;
    this.getInfo(idVideo);
    this.updateHistory(idVideo);
    this.currentTime = 0;
    this.storage.clear();
    this.started = true;
  }

  getListVideoTags(idVideo: string) {
    this.totalTags = 0;
    this.tagService.getVideoTags(idVideo).subscribe((value: JsonResponse) => {

      this.videoTags = value.data;
      if(this.videoTags){
        for(let tag of this.videoTags){
          if(tag.selected){
            this.totalTags++;
          }
        }

      }

    });
  }

  iniciar() {
    console.log('Iniciar')
    this.listarPlaylists();
    this.loadLastVideos();
    this.totalTags = 0;
    this.idVideo = this.route.snapshot.paramMap.get('idVideo');
    this.getInfo(this.idVideo);
    this.getListVideoTags(this.idVideo);
    this.updateHistory(this.idVideo);
  }

  ngOnInit() {
    console.log('Init');
    this.iniciar();

    const key = StorageService.KEY_TIME;
    const videoPlayer = this.videoPlayer;
    const storageService = this.storage;
    const method = this.onEnded();

    const secondsCounter = interval(1000);

    secondsCounter.subscribe(n => {
      if (videoPlayer.currentTime === videoPlayer.duration) {
        this.onEnded();
      }
      storageService.storeItem(key, videoPlayer.currentTime.toString());
    });
  }

  updateHistory(idVideo){
    //console.log('UPDATING HISTORY', idVideo);
    this.videoService.updateHistory(idVideo).subscribe(value => {
      //console.log('UPDATED HISTORY', value);
    });
  }

  onChangeStar(stars: number) {
    this.rating = stars;
    this.videoService.setField(this.idVideo, 'rating', stars.toString()).subscribe((response: JsonResponse) => {
      if (response.success) {
        this.loadStars(stars);
      }
    });

  }

  onEnded() {
    if(this.started){
      console.log('ended',this.duration,this.currentTime);
      if (this.lastVideos && this.lastVideos.length > 0 && this.duration>0 && this.duration == this.currentTime) {
        this.started = false;
        this.position = this.position + 1;
        const next = this.position;
        const nextVideo = this.lastVideos[next];
        this.currentTime = 0;
        this.play(this.lastVideos[next].idVideo.toString());
        //this.router.navigateByUrl(`/play/id/${this.lastVideos[next].idVideo}`);

      }
    }

  }

  loadStars(stars: number) {
    this.rating = stars;
    const max = 10;
    for (let i = 0; i < max; i++) {
      if (stars > i) {
        this.starsSelected[i] = {index: i, rating: i + 1, selected: true};
      } else {
        this.starsSelected[i] = {index: i, rating: i + 1, selected: false};
      }
    }
  }

  listarPlaylists() {
    this.playlistService.getListAll().subscribe(retorno => {
      //console.log(retorno);
      if(retorno.success){
        this.playLista = retorno.data;
      }
    });
  }

  onSelectTab(tabname: string) {
    for (let tab of this.tabs) {
      tab.selected = false;
      if (tab.tabname === tabname) {
        tab.selected = true;
      }
    }
  }

  onSelectTag(tag: Tag) {
    if (tag.selected) {

      this.tagService.removeVideoTags(this.idVideo, tag.idTag + '').subscribe((value: JsonResponse) => {
        if (value.success) {
          if(this.totalTags> 0) {
            this.totalTags = this.totalTags-1;
          }
          tag.selected = false;
        }
      });
    } else {
      this.tagService.addVideoTags(this.idVideo, tag.idTag + '').subscribe((value: JsonResponse) => {
        if (value.success) {
          this.totalTags = this.totalTags+1;
          tag.selected = true;
        }
      });
    }

  }
  onSelectPlaylist(playlist: Playlist) {
    let videoPlayList = new VideoPlaylist();
    videoPlayList.idPlaylist = playlist.idPlaylist;
    videoPlayList.idVideo = Number(this.idVideo);
    this.playlistService.adicionarVideo(videoPlayList).subscribe(retorno =>{
      console.log('Adicionado..');
    });
  }

  loadLastVideos() {
    const lastType = this.storage.get(StorageService.KEY_LAST_TYPE);
    let lastPage = this.storage.get(StorageService.KEY_LAST_PAGE);

    if (!lastPage || lastPage == 'null') {
      lastPage = '0';
    }
    if(this.storage.get(StorageService.KEY_IS_BUSCA) == 'true'){
      this.videoService.lastBusca().subscribe((response: JsonResponse) =>{
        this.lastVideos = response.data;
        this.findPosition();
      });
    }else{
      if (this.session.lastVideos && this.session.lastVideos.length > 0) {
        this.lastVideos = this.session.lastVideos;

        this.findPosition();
      } else {
        if (lastType) {
          this.videoService.getListVideoByType(lastType, lastPage).subscribe(resp => {


            this.lastVideos = resp['data'];

            this.session.lastVideos = resp['data'];
            this.findPosition();
          });
        }

      }
    }

  }

  findPosition() {
    let i = 0;
    for (let video of this.lastVideos) {
      if (Number(this.idVideo) == video.idVideo) {
        this.position = i;
        break;
      }
      i = i + 1;
    }
  }

  isTabSelected(tabname: string) {
    for (let tab of this.tabs) {
      if (tab.tabname === tabname) {
        return tab.selected;
      }
    }
    return false;
  }


  onTimeUpdate() {
    if (this.videoPlayer && !this.seeking) {
      this.currentTime = this.videoPlayer.currentTime;
      this.duration = this.videoPlayer.duration;
    }

  }

  onPlayPause() {

    if (this.videoPlayer.paused) {
      this.videoPlayer.play();
    } else {
      this.videoPlayer.pause();
    }
  }


  onLoaded() {

    const lastTime = this.storage.getAsInt(StorageService.KEY_TIME);

    if (lastTime) {
      this.videoPlayer.currentTime = Number(lastTime);
    }
    this.videoPlayer.play();
  }

  onAdvanceTenSeconds() {
    this.videoPlayer.currentTime = this.videoPlayer.currentTime + 10;
  }

  onBackTenSeconds() {
    this.videoPlayer.currentTime = this.videoPlayer.currentTime - 10;
  }

}
