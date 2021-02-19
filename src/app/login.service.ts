import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {HttpClient} from "@angular/common/http";
import {JsonResponse} from "./model/JsonResponse";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = Constants.getAuthUrl();
  constructor(private http: ApiService) { }

  doLogin(usuario: string,senha: string) {
    return this.http.doLogin(usuario,senha);
  }

  checkLogin() {
    return this.http.get(this.url+"/verify");
  }
}
