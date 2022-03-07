import { Component, OnInit } from '@angular/core';
import {CheckupService} from "../checkup.service";

@Component({
  selector: 'app-check-links',
  templateUrl: './check-links.component.html',
  styleUrls: ['./check-links.component.scss']
})
export class CheckLinksComponent implements OnInit {


  constructor(public checkupService: CheckupService) { }

  public text: string;
  public after:number;
  public before:number;
  public transformMessage = "";


  public output: string;
  showText(){
    this.checkupService.validadeLinks(this.text).subscribe(response => {
      if(response.success){
        this.output = response.data.links;
        this.after = response.data.after;
        this.before = response.data.before;

        this.transformMessage = "Total of "+this.before+" now is "+this.after;
      }
    });
    console.log(this.text);
  }

  ngOnInit(): void {
  }
}