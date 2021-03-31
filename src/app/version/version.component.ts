import { Component, OnInit } from '@angular/core';
import { version } from '../../../package.json';
import {VersionService} from "../version.service";

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  public version: string = version;
  public backendVersion: string;
  constructor(private versionService: VersionService) { }

  ngOnInit(): void {
    this.versionService.getVersion().subscribe(response=> {
      if(response.success){
        this.backendVersion = response.data.version;
      }
    });
  }

}
