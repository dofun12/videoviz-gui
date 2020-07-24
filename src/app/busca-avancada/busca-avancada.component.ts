import { Component, OnInit } from '@angular/core';
import {VideoSimple} from "../video-simple";
import {PesquisaJS} from "../model/PesquisaJS";
import {VideoService} from "../video.service";
import {TagsService} from "../tags.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../session";
import {StorageService} from "../storage.service";
import {JsonResponse} from "../model/JsonResponse";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {Tag} from "../model/Tag";
import {environment} from "../../environments/environment";
import {VSession} from "../model/VSession";
import {Condicao} from "../model/condicao";
import {FormControl, FormGroup} from "@angular/forms";
import {PesquisaAvancadaJS} from "../model/PesquisaAvancadaJS";
import * as moment from 'moment';

@Component({
  selector: 'app-busca-avancada',
  templateUrl: './busca-avancada.component.html',
  styleUrls: ['./busca-avancada.component.scss']
})
export class BuscaAvancadaComponent implements OnInit {
  pesquisaAvancada = new PesquisaAvancadaJS();
  tags: string[];
  sortColumn: string;
  sortMode: string;
  listVideo: VideoSimple[] = [];
  type: string = null;
  page: string = '0';
  imageUrl: string;
  tagSelecionada: string;
  pesquisaJS: PesquisaJS;
  public model: string;

  tituloFilter: Condicao = new Condicao();
  tagFilter: Condicao = new Condicao();
  ratingFilter: Condicao = new Condicao();


  constructor(private videoService: VideoService, private tagsService: TagsService,private route: ActivatedRoute,
              private router: Router, private session: Session, private storage: StorageService) {
    this.reset();

  }

  getNewCondicao(campo: string, tipo: string){
    let cond = new Condicao();
    cond.valor = '';
    cond.condicao = this.getCondicaoList(tipo)[0].value;
    cond.criterio = this.getCriterios()[0].value;
    cond.campo = campo;
    cond.tipo = tipo;
    cond.valor = '';
    console.log('cond',cond);
    return cond;
  }

  formatDate(dateAsLong: string){
    if(dateAsLong){
      return moment(dateAsLong,'x').format('DD-MM-YYYY');
    }else{
      return '?';
    }

  }

  getSortTypes(){
    return [
      {label: 'Menor para o Maior',value:'asc'},
      {label: 'Maior para o menor',value:'desc'},
    ];
  }

  getSortColumns(){
    return [
      {label: 'idVideo',value:'idVideo', selected: true},
      {label: 'title',value:'title'},
      {label: 'code',value:'code'},
      {label: 'rating',value:'rating'},
      {label: 'lastwatched',value:'lastwatched'},
      {label: 'dateAdded',value:'dateAdded'},
      {label: 'duration',value:'duration'},
      {label: 'random',value:'rand()'}
    ];
  }

  getCriterios(){
    return [
      {label: 'And',value:'and', selected: true},
      {label: 'Or',value:'or'}
    ];
  }

  reset(){
    this.tituloFilter = this.getNewCondicao('title','texto');
    this.tagFilter = this.getNewCondicao('tags','texto');
    this.ratingFilter = this.getNewCondicao('rating','numero');
    this.pesquisaAvancada.sortType = this.getSortTypes()[0].value;
    this.pesquisaAvancada.sortColumn = this.getSortColumns()[0].value;
  }
  limpar(){
    this.pesquisaAvancada.condicoes = [];
    this.pesquisaAvancada.sortType = this.getSortTypes()[0].value;
    this.pesquisaAvancada.sortColumn = this.getSortColumns()[0].value;
  }

  pesquisar(){
    localStorage.setItem('ultimaBusca',JSON.stringify(this.pesquisaAvancada));

    this.videoService.buscaAvancada(this.pesquisaAvancada).subscribe((response: JsonResponse) => {
      this.listVideo = response.data;
    });
  }

  adicionarCondicao(condicao: Condicao){
    if(condicao.valor && condicao.valor.length>0){
      this.pesquisaAvancada.condicoes.push(condicao);
      console.log(condicao);
      this.reset();
    }
  }

  getCondicaoList(tipo: string){
    if('texto' == tipo){
      return [
        {label: 'Like',value:'like'},
        {label: 'Not Like',value:'not like'}
      ];
    }
    if('numero' == tipo){
      return [
        {label: 'Maior que',value:'>'},
        {label: 'Menor que',value:'<'},
        {label: 'Menor ou igual que',value:'<='},
        {label: 'Maior ou igual que',value:'>='}
      ];
    }
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
    this.pesquisaAvancada = new PesquisaAvancadaJS();
    this.pesquisaAvancada.condicoes = [];
    this.listTags();
    console.log('verificando ultimabusca');
    if(localStorage.getItem('ultimaBusca')){
      this.pesquisaAvancada  = JSON.parse(localStorage.getItem('ultimaBusca'));
      this.videoService.lastBusca().subscribe((response: JsonResponse) => {
        this.listVideo = response.data;
        if(!this.listVideo){
          this.listVideo = [];
        }
      })

    }else{
      this.limpar();
    }
    this.imageUrl = environment.remoteImageUrl;

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

}
