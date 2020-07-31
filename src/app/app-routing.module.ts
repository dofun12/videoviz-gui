import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoListComponent} from "./video-list/video-list.component";
import {PlayerComponent} from "./player/player.component";
import {VideoSessionComponent} from "./video-session/video-session.component";
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

const routes: Routes = [
  {path: 'play/id/:idVideo', component: VideoSessionComponent, canActivate: [AuthGuardService]},
  {path: 'videos', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type/:page', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuardService]},
  {path: 'busca', component: BuscaComponent, canActivate: [AuthGuardService]},
  {path: 'busca-avancada', component: BuscaAvancadaComponent, canActivate: [AuthGuardService]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuardService]},
  {path: 'fila', component: FilaDownloadComponent, canActivate: [AuthGuardService]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'locations', component: LocationsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
