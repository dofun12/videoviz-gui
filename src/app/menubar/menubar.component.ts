import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Session} from "../session";
import {VideoService} from "../video.service";
import {JsonResponse} from "../model/JsonResponse";
import {VideoType} from "../model/VideoType";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  @Input()
  mostrarMenu: boolean = true;

  @Input()
  menuTitle: string = "";

  @Input()
  rating: number = 0;

  @Input()
  tags: number = 0;

  @Input()
  mostrarResumo = false;


  videoType: VideoType[];
  constructor(private router:Router,public session:Session, private videoService:VideoService) {
    this.router.events.subscribe((val)=>{
      this.session.mostrarMenu = false;
    });
    this.videoService.getListTypes().subscribe((response: JsonResponse)=>{
      this.videoType = response.data;
    })
  }
  showMenuLateral: boolean = false;


  ngOnInit() {
  }







}
