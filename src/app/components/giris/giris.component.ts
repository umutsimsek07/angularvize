import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Uye } from 'src/app/models/uye';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.scss']
})
export class GirisComponent implements OnInit {
  returnUrl="";
  constructor(
    public servis: DataService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/anketler';
  }
  GirisYap(k: string, p: string) {
    this.servis.UyeLogin(k, p).subscribe((d: Uye[]) => {
      if (d.length > 0) {
        var yetkiler = [];
        if (d[0].admin == 1) {
          yetkiler.push("Uye");
          yetkiler.push("Admin");
        }
        else {
          yetkiler.push("Uye");
        }
        localStorage.setItem("token", this.servis.ParolaUret(64));
        localStorage.setItem("uyeYetkileri", JSON.stringify(yetkiler));
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }
}
