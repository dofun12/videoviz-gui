import { Component, OnInit } from '@angular/core';
import {JsonResponse} from "../model/JsonResponse";
import {Router} from "@angular/router";
import {Session} from "../session";
import {VideoService} from "../video.service";
import {VideoType} from "../model/VideoType";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,public session:Session, private videoService:VideoService) { }
  videoType: VideoType[];

  ngOnInit(): void {
    this.videoService.getListTypes().subscribe((response: JsonResponse)=>{
      this.videoType = response.data;
    })
  }

}
