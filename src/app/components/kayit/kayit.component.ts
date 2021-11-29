import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.component.html',
  styleUrls: ['./kayit.component.scss']
})
export class KayitComponent implements OnInit {
  uye: Uye[];
  secUye: Uye = new Uye();
  sonuc= new Sonuc();
  constructor(
    public service: DataService
  ) { }

  ngOnInit() {
  }
  KayitOl() {
    this.secUye.id = 0;
    this.secUye.admin=0;
    var tarih = new Date();
    if (this.secUye.id == 0) {
      this.secUye.id = Math.floor(Math.random() * 1000);
      this.secUye.kayTarih = tarih.getTime().toString();
      this.secUye.duzTarih = tarih.getTime().toString();
      this.service.UyeEkle(this.secUye).subscribe(d => {
        this.sonuc.islem=true;
        this.sonuc.mesaj="Kayıt Eklendi";
      },err=>{
        this.sonuc.islem=false;
        this.sonuc.mesaj="Hata Oluştu";
      }
      );
    }
  }
}

