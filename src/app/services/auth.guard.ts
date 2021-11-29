import { Sonuc } from 'src/app/models/sonuc';
import { DataService } from 'src/app/services/data.service'
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  sonuc: Sonuc[];
  constructor(
    public servis: DataService,
    public router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let yetkiler = route.data["yetkiler"] as Array<string>;

    if (!this.servis.OturumKontrol()) {
      this.router.navigate(['giris'], {queryParams: {returnUrl: state.url}});
    }

    var sonuc: boolean = false;

    sonuc = this.servis.YetkiKontrol(yetkiler);
    if (!sonuc) {
      this.router.navigate(['giris'], {queryParams: {returnUrl: state.url}});
    }

    return sonuc;

  }

}
