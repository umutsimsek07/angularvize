import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { CevaplarComponent } from './components/cevaplar/cevaplar.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { AnketlerComponent } from './components/anketler/anketler.component';
import { KayitComponent } from './components/kayit/kayit.component';
import { GirisComponent } from './components/giris/giris.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth.guard';
import { AdminpaneliComponent } from './components/adminpaneli/adminpaneli.component';

@NgModule({
  declarations: [
    AppComponent,
    KayitComponent,
    AnketlerComponent,
    GirisComponent,
    SorularComponent,
    CevaplarComponent,
    AdminpaneliComponent,
    AnasayfaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
