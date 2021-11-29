import { AppComponent } from './app.component';
import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { CevaplarComponent } from './components/cevaplar/cevaplar.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { GirisComponent } from './components/giris/giris.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnketlerComponent } from './components/anketler/anketler.component';
import { KayitComponent } from './components/kayit/kayit.component';
import { AuthGuard } from './services/auth.guard';
import { AdminpaneliComponent } from './components/adminpaneli/adminpaneli.component';


const routes: Routes = [
  { path: 'anketler', component: AnketlerComponent, canActivate: [AuthGuard], data: { yetkiler: ['Uye'] } },
  { path: 'adminpaneli', component: AdminpaneliComponent, canActivate: [AuthGuard], data: { yetkiler: ['Uye'] } },
  { path: 'soru/:aId', component: SorularComponent, canActivate: [AuthGuard], data: { yetkiler: ['Uye'] } },
  { path: 'cevap/:cId', component: CevaplarComponent, canActivate: [AuthGuard], data: { yetkiler: ['Admin'] } },
  { path: 'giris', component: GirisComponent },
  { path: 'kayit', component: KayitComponent },
  { path: 'anasayfa', component: AnasayfaComponent },
  { path: 'anasayfa', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
