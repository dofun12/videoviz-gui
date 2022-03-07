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
import { LoginComponent } from './login/login.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LocationsComponent } from './locations/locations.component';
import {LocationsModalComponent} from "./locations/locations-modal.component";
import { HomeComponent } from './home/home.component';
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import { EditVideoModalComponent } from './modals/edit-video-modal/edit-video-modal.component';
import { VideoSessionNewComponent } from './video-session-new/video-session-new.component';
import { CheckupComponent } from './checkup/checkup.component';
import { CheckLinksComponent } from './check-links/check-links.component';
import { VideoComponent } from './video/video.component';
import { VideoModalComponent } from './modals/video-modal/video-modal.component';
import { VersionComponent } from './version/version.component';
import { SimpleListVideoComponent } from './simple-list-video/simple-list-video.component';



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
    InfoComponent,
    LoginComponent,
    GenericModalComponent,
    LocationsComponent,
    LocationsModalComponent,
    HomeComponent,
    UploadModalComponent,
    EditVideoModalComponent,
    VideoSessionNewComponent,
    CheckupComponent,
    CheckLinksComponent,
    VideoComponent,
    VideoModalComponent,
    VersionComponent,
    SimpleListVideoComponent
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
