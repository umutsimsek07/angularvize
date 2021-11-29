import { Sonuc } from './../../models/sonuc';
import { ActivatedRoute } from '@angular/router';
import { Anket } from './../../models/anket';
import { Component, OnInit } from '@angular/core';
import { Soru } from 'src/app/models/soru';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sorular',
  templateUrl: './sorular.component.html',
  styleUrls: ['./sorular.component.scss']
})
export class SorularComponent implements OnInit {
  sorular: Soru[];
  secSoru: Soru = new Soru();
  anketId: number;
  secAnket: Anket;
  sonuc: Sonuc = new Sonuc();
  anketler: Anket[];
  ara: any = "";
  sira: any = "anketadi";
  constructor(
    public servis: DataService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.anketId = p.aId;
      this.AnketGetir();
      this.SoruListe();
      this.AnketListe();
      this.secSoru.id = 0;
      this.secSoru.anketById = this.anketId;
    });
  }

  SoruListe() {
    this.servis.SoruListeleByAnketId(this.anketId).subscribe((d: Soru[]) => {
      this.sorular = d;
    });
  }
  AnketListe() {
    this.servis.AnketListele(this.ara, this.sira).subscribe((d: Anket[]) => {
      this.anketler = d;
    })
  }
  AnketGetir() {
    this.servis.AnketById(this.anketId).subscribe((d: Anket) => {
      this.secAnket = d;
    });
  }
  Duzenle(d: Soru) {
    Object.assign(this.secSoru, d);
  }
  Sil(d: Soru) {
    this.servis.SoruSil(d.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Soru Silindi";
      this.SoruListe();
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }
  Iptal() {
    this.secSoru = new Soru();
    this.secSoru.id = 0;
    this.secSoru.anketById = this.anketId;
    this.sonuc = new Sonuc();
  }
  Kaydet() {
    if (this.secSoru.id == 0) {
      var tarih = new Date();
      this.secSoru.kayTarih = tarih.getTime().toString();
      this.secSoru.duzTarih = tarih.getTime().toString();
      this.servis.SoruEkle(this.secSoru).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Soru Eklendi";
        this.SoruListe();
        this.secSoru = new Soru();
        this.secSoru.id=0;
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
    else {
      var tarih = new Date();
      this.secSoru.duzTarih = tarih.getTime().toString();
      this.servis.SoruDuzenle(this.secSoru).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Soru Düzenlendi";
        this.SoruListe();
        this.Iptal();
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
  }

  YetkiKontrol(yetkiler: any) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem('uyeYetkileri'));
    if (yetkiler) {
      yetkiler.forEach((element: any) => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }
    return sonuc;
  }
}
