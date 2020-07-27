import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JsonResponse} from "./model/JsonResponse";
import {Constants} from "./constants";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GenericModalComponent} from "./generic-modal/generic-modal.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router,private modalService: NgbModal ) {
  }

  isModalOpened = false;

  private getOptions() {
    const jwt = localStorage.getItem("jwt");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return httpOptions;
  }

  private doPipe(observable: Observable<JsonResponse>): Observable<JsonResponse> {
    return observable.pipe(
        catchError(err => {
          if(err.status === 401){
            this.openRedirectModal();
          }
          console.log('Errozinho',err);
          let retorno = new JsonResponse();
          retorno.success = false;
          retorno.detail = err;
          return of(retorno);
        }));
  }

  private openRedirectModal(){
    console.log('this.isModalOpened',this.isModalOpened);
    if(!this.isModalOpened){
      this.isModalOpened = true;
      const modalRef = this.modalService.open(GenericModalComponent);
      modalRef.componentInstance.name = 'Erro 401';
      modalRef.result.finally(()=>{
        this.router.navigateByUrl("/login");
      });
    }

  }

  doLogin(usuario: string, senha: string) {
    this.isModalOpened = false;
    const data = {"username": usuario, "password": senha};
    return this.doPipe(this.http.post<JsonResponse>(Constants.getRemoteUrl() + "/api/auth/signin", data));
  }


  public get(url:string) {
    return this.doPipe(this.http.get<JsonResponse>(url, this.getOptions()));
  }

  public put(url:string, data:any ) {
    return this.doPipe(this.http.put<JsonResponse>(url, data, this.getOptions()));
  }

  public post(url:string, data:any) {
    return this.doPipe(this.http.post<JsonResponse>(url, data, this.getOptions()));
  }

  public delete(url:string) {
    return this.doPipe(this.http.delete<JsonResponse>(url, this.getOptions()));
  }

}
