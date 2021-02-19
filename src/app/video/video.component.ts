import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../video.service";
import {VideoNode} from "../videoNode";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  key: string;
  videoNode : VideoNode;
  value: string;
  fileexists = false;
  constructor(private route: ActivatedRoute,
              private router: Router,private videoService: VideoService) {
    this.key = this.route.snapshot.paramMap.get('key');
    this.value = this.route.snapshot.paramMap.get('value');
    console.log('Started')
    console.log(this.key,this.value);
    this.videoService.getMetadata(this.key,this.value).subscribe(response =>{
      if(response.success){
        this.fileexists = response.data.fileexists;
        this.videoNode = response.data;
        console.log(response);
      }
      this.fileexists = false;
    });
  }

  ngOnInit(): void {

  }

}
