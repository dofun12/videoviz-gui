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
import {CheckLinksComponent} from "./check-links/check-links.component";
import {VideoComponent} from "./video/video.component";
import {VersionComponent} from "./version/version.component";
import {PlaylistVideosComponent} from "./playlist-videos/playlist-videos.component";

const routes: Routes = [
  {path: 'play/:source/:idVideo', component: VideoSessionNewComponent, canActivate: [AuthGuardService]},
  {path: 'videos', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'video/:key/:value', component: VideoComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'videos/:type/:page', component: VideoListComponent, canActivate: [AuthGuardService]},
  {path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuardService]},
  {path: 'playlist/:idPlaylist', component: PlaylistVideosComponent, canActivate: [AuthGuardService]},
  {path: 'busca', component: BuscaComponent, canActivate: [AuthGuardService]},
  {path: 'busca-avancada', component: BuscaAvancadaComponent, canActivate: [AuthGuardService]},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuardService]},
  {path: 'fila', component: FilaDownloadComponent, canActivate: [AuthGuardService]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuardService]},
  {path: 'checkup', component: CheckupComponent, canActivate: [AuthGuardService]},
  {path: 'check-links', component: CheckLinksComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'version', component: VersionComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'locations', component: LocationsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
