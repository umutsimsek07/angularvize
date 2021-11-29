import { Soru } from 'src/app/models/soru';
import { Uye } from 'src/app/models/uye';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Anket } from 'src/app/models/anket';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anketler',
  templateUrl: './anketler.component.html',
  styleUrls: ['./anketler.component.scss']
})
export class AnketlerComponent implements OnInit {
  uyeler:Uye[];
  anketler: Anket[];
  secAnket: Anket = new Anket();
  sonuc: Sonuc = new Sonuc();
  ara: any = "";
  sira: any = "";
  sayfa: number = 1;
  limit: number = 5;
  islem: boolean = false;
  constructor(
    public servis: DataService
  ) { }

  ngOnInit() {
    this.secAnket.id = 0;
    this.AnketSayfala();
  }
  AnketListe() {
    this.servis.AnketListele(this.ara, this.sira).subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }

  Duzenle(anket: Anket) {
    Object.assign(this.secAnket, anket);
  }
  Sil(anket: Anket) {
    this.servis.AnketSil(anket.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Anket Silindi";
      this.AnketListe();
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }
  Iptal() {
    this.secAnket = new Anket();
    this.secAnket.id = 0;
    this.sonuc = new Sonuc();
  }


  Kaydet() {
    if (this.secAnket.id == 0) {
      var tarih = new Date();
      this.secAnket.kayTarih = tarih.getTime().toString();
      this.secAnket.duzTarih = tarih.getTime().toString();
      this.servis.AnketEkle(this.secAnket).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Anket Eklendi";
        this.AnketListe();
        this.secAnket=new Anket();
        this.secAnket.id=0;
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
    else {
      var tarih = new Date();
      this.secAnket.duzTarih = tarih.getTime().toString();
      this.servis.AnketDuzenle(this.secAnket).subscribe(d => {

        this.sonuc.islem = true;
        this.sonuc.mesaj = "Anket Düzenlendi";
        this.AnketListe();
        this.Iptal();
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
  }
  Ara(d: string) {
    this.ara = d;
    this.AnketListe();
  }
  Sirala(s: any) {
    this.sira = s;
    this.AnketListe();
  }
  AnketSayfala() {
    this.servis.AnketSayfala(this.sayfa, this.limit).subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }
  OncekiSayfa() {
    this.sayfa -= 1;
    this.AnketSayfala();
  }
  SonrakiSayfa() {
    this.sayfa += 1;
    this.AnketSayfala();
  }
  LimitBelirle(d: number) {
    this.limit = d;
    this.AnketSayfala();
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
