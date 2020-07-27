import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }


  usuario: string;
  senha: string;
  disableButton = false;
  doLogin(): void{
      this.disableButton = true;
      this.loginService.doLogin(this.usuario,this.senha).subscribe(retorno =>{
        this.disableButton = false;
        if(retorno.success){
          localStorage.setItem('jwt',retorno.data);
          this.router.navigateByUrl("/videos")
        }
      });
  }
}
