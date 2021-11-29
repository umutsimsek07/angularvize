import { DataService } from 'src/app/services/data.service';
import { Sonuc } from './../../models/sonuc';
import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpaneli',
  templateUrl: './adminpaneli.component.html',
  styleUrls: ['./adminpaneli.component.scss']
})
export class AdminpaneliComponent implements OnInit {
  uyeler: Uye[];
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  islem: boolean = false;
  ara: any="";
  constructor(
    public servis: DataService
  ) { }

  ngOnInit() {
    this.UyeListele();
    this.secUye.id=0;
  }

  UyeListele() {
    this.servis.UyeListele(this.ara).subscribe((d: Uye[]) => {
      this.uyeler = d;
    });
  }
  Kaydet() {
    var tarih = new Date();
    this.secUye.duzTarih=tarih.getTime().toString();
    this.secUye.kayTarih=tarih.getTime().toString();
    this.servis.uyeYetkilendir(this.secUye).subscribe(d => {
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kullanıcı Düzenlendi";
      this.UyeListele();
      this.Vazgec();
    }, err => {
      this.sonuc.islem=false;
      this.sonuc.mesaj="Hata Oluştu";
    });
  }
  Vazgec() {
    this.secUye= new Uye();
    this.secUye.id=0;
  }
  Sil(uye: Uye){
    this.servis.UyeSil(uye.id).subscribe(d => {
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kullanıcı Silindi";
      this.UyeListele();
      this.Vazgec();
    },err=>{
      this.sonuc.islem=false;
      this.sonuc.mesaj="Hata Oluştu";
    });
  }
  Duzenle(uye:Uye){
    Object.assign(this.secUye,uye);
  }

  Goster(){
    this.islem=true;
  }
  Gizle(){
    this.islem=false;
  }
  Ara(d: string){
    this.ara=d;
    this.UyeListele();
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
