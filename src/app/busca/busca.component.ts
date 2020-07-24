import {Component, OnInit} from '@angular/core';
import {VideoSimple} from "../video-simple";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {environment} from "../../environments/environment";
import {VSession} from "../model/VSession";
import {PesquisaJS} from "../model/PesquisaJS";
import {JsonResponse} from "../model/JsonResponse";
import {TagsService} from "../tags.service";
import {Tag} from "../model/Tag";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  tags: string[];
  listVideo: VideoSimple[] = [];
  type: string = null;
  page: string = '0';
  imageUrl: string;
  tagSelecionada: string;
  pesquisaJS: PesquisaJS;
  public model: string;

  constructor(private videoService: VideoService, private tagsService: TagsService,private route: ActivatedRoute,
              private router: Router, private session: Session, private storage: StorageService) {

  }

  includeTag(){
    console.log(this.model);
    this.pesquisaJS.includeTags.push(this.model);
  }
  clear(){
    this.pesquisaJS =new PesquisaJS();
    this.pesquisaJS.includeTags = [];
    this.pesquisaJS.excludeTags = [];
    localStorage.removeItem('ultimaBusca');
  }

  excludeTag(){
    this.pesquisaJS.excludeTags.push(this.model);
  }

  listTags(){
    this.tagsService.getListAll().subscribe((response: JsonResponse) =>{
      this.tags = response.data;
    });
  }



  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.tags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  formatter = (tag: Tag) => tag.tag;


  ngOnInit() {

    this.listTags();
    console.log('verificando ultimabusca');
    if(localStorage.getItem('ultimaBusca')){
      this.pesquisaJS = JSON.parse(localStorage.getItem('ultimaBusca'));
      this.videoService.lastBusca().subscribe((response: JsonResponse) => {
        this.listVideo = response.data;
        if(!this.listVideo){
          this.listVideo = [];
        }
      })
    }else{
      this.clear();
    }
    this.imageUrl = environment.remoteImageUrl;

  }

  onBuscar() {
    localStorage.setItem('ultimaBusca',JSON.stringify(this.pesquisaJS));
    this.videoService.buscar(this.pesquisaJS).subscribe((response: JsonResponse) => {
      this.listVideo = response.data;
    });
  }

  play(idVideo: number) {
    this.storage.clear();
    let vsession: VSession = new VSession();
    vsession.lastType = this.type;
    vsession.lastPage = this.page;
    vsession.idVideo = idVideo;
    vsession.isBusca = true;
    this.storage.store(vsession);
    this.router.navigate(['/play/id/' + idVideo]);
  }

  initType() {
    this.videoService.getListVideoByType(this.type, this.page).subscribe(resp => {
      localStorage.setItem("lastype", this.type);
      localStorage.setItem("lastpage", this.page);
      console.log('loading videos', resp);
      this.listVideo = resp['data'];
      this.session.lastVideos = resp['data'];
    });
  }

}
