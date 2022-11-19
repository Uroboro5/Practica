import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MisNotasComponent } from './mis-notas/mis-notas.component';
import { NotasFavoritasComponent } from './notas-favoritas/notas-favoritas.component';

import { ServicioService } from './services/servicio.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import { MenuComponent } from './menu/menu.component';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NuevaNotaComponent } from './nueva-nota/nueva-nota.component';
import { FechaPipe } from './pipes/fecha.pipe';
import {InputSwitchModule} from 'primeng/inputswitch';




@NgModule({
  declarations: [
    AppComponent,
    MisNotasComponent,
    NotasFavoritasComponent,
    MenuComponent,
    NuevaNotaComponent,
    FechaPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    PanelModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule
  ],
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
