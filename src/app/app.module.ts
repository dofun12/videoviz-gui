import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { VideoListComponent } from './video-list/video-list.component';
import {Routes} from "@angular/router";
import { PlayerComponent } from './player/player.component';
import { VideoSessionComponent } from './video-session/video-session.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenubarComponent } from './menubar/menubar.component';
import {Session} from "./session";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SecondsFormat} from "./pipes/seconds-format";
import { BuscaComponent } from './busca/busca.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistVideosComponent } from './playlist-videos/playlist-videos.component';
import { BuscaAvancadaComponent } from './busca-avancada/busca-avancada.component';
import { UploadComponent } from './upload/upload.component';
import { FilaDownloadComponent } from './fila-download/fila-download.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    PlayerComponent,
    VideoSessionComponent,
    MenubarComponent,
    SecondsFormat,
    BuscaComponent,
    PlaylistComponent,
    PlaylistVideosComponent,
    BuscaAvancadaComponent,
    UploadComponent,
    FilaDownloadComponent,
    InfoComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule
    ],
  providers: [Session],
  bootstrap: [AppComponent]
})
export class AppModule {
}
