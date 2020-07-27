import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JsonResponse} from "./model/JsonResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private getOptions() {
    const jwt = localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return httpOptions;
  }

  public get(url: string) {
    return this.http.get<JsonResponse>(url, this.getOptions());
  };

  public put(url: string, data: any) {
    return this.http.put<JsonResponse>(url, data, this.getOptions());
  };

  public post(url: string, data: any) {
    return this.http.post<JsonResponse>(url, data, this.getOptions());
  };

  public delete(url: string) {
    return this.http.delete<JsonResponse>(url,this.getOptions());
  };
}
