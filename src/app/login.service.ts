import { Injectable } from '@angular/core';
import {Constants} from "./constants";
import {HttpClient} from "@angular/common/http";
import {JsonResponse} from "./model/JsonResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url = Constants.getRemoteUrl()+'/api/auth';
  constructor(private http: HttpClient) { }

  doLogin(usuario: string,senha: string) {

    const data  = {"username": usuario, "password": senha};
    console.log(data);
    return this.http.post<JsonResponse>(this.url+"/signin",data );
  }
}
