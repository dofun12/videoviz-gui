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

const routes: Routes = [
  {path: 'play/id/:idVideo', component: VideoSessionComponent},
  {path: 'videos', component: VideoListComponent},
  {path: 'videos/:type', component: VideoListComponent},
  {path: 'videos/:type/:page', component: VideoListComponent},
  {path: 'playlist', component: PlaylistComponent},
  {path: 'busca', component: BuscaComponent},
  {path: 'busca-avancada', component: BuscaAvancadaComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'fila', component: FilaDownloadComponent},
  {path: 'info', component: InfoComponent},
  {path: '', redirectTo: '/videos/unrated', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
