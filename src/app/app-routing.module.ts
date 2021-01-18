import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoListComponent} from "./video-list/video-list.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {BuscaComponent} from "./busca/busca.component";
import {BuscaAvancadaComponent} from "./busca-avancada/busca-avancada.component";
import {PesquisaAvancadaJS} from "./model/PesquisaAvancadaJS";
import {UploadComponent} from "./upload/upload.component";
import {FilaDownloadComponent} from "./fila-download/fila-download.component";
import {InfoComponent} from "./info/info.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {LocationsComponent} from "./locations/locations.component";
import {HomeComponent} from "./home/home.component";
import {VideoSessionNewComponent} from "./video-session-new/video-session-new.component";
import {CheckupComponent} from "./checkup/checkup.component";

const routes: Routes = [
  {path: 'play/id/:idVideo', component: VideoSessionNewComponent, canActivate: [AuthGuardService]},
  {path: 'videos', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type/:page', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuardService]},
  {path: 'busca', component: BuscaComponent, canActivate: [AuthGuardService]},
  {path: 'busca-avancada', component: BuscaAvancadaComponent, canActivate: [AuthGuardService]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuardService]},
  {path: 'fila', component: FilaDownloadComponent, canActivate: [AuthGuardService]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuardService]},
  {path: 'checkup', component: CheckupComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'locations', component: LocationsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
