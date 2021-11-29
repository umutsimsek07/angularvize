import { Anket } from 'src/app/models/anket';
import { Sonuc } from './../../models/sonuc';
import { Soru } from 'src/app/models/soru';
import { Component, OnInit } from '@angular/core';
import { Cevap } from 'src/app/models/cevap';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cevaplar',
  templateUrl: './cevaplar.component.html',
  styleUrls: ['./cevaplar.component.scss']
})
export class CevaplarComponent implements OnInit {
  anketler: Anket[];
  cevaplar: Cevap[];
  secCevap: Cevap = new Cevap();
  soruId: number;
  anketId: number;
  secSoru: Soru;
  sonuc: Sonuc = new Sonuc();
  sorular: Soru[];
  soruById: number;
  constructor(
    public servis: DataService,
    public route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.soruId = p.cId;
      this.SoruGetir();
      this.CevapListe();
      this.SoruListe();
      this.secCevap.id = 0;
      this.secCevap.soruById = this.soruId;
    });
  }

  goBack() {
    this.location.back();
  }



  CevapListe() {
    this.servis.CevapListeleBySoruId(this.soruId).subscribe((d: Cevap[]) => {
      this.cevaplar = d;
    })
  }
  SoruListe() {
    this.servis.SoruListeleByAnketId(this.anketId).subscribe((d: Soru[]) => {
      this.sorular = d;
    })
  }
  SoruGetir() {
    this.servis.SoruById(this.soruId).subscribe((d: Soru) => {
      this.secSoru = d;
    });
  }
  Duzenle(d: Cevap) {
    Object.assign(this.secCevap, d);
  }
  Sil(d: Cevap) {
    this.servis.CevapSil(d.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Cevap Silindi";
      this.CevapListe();
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu";
    });
  }
  Iptal() {
    this.secCevap = new Cevap();
    this.secCevap.id = 0;
    this.secCevap.soruById = this.soruId;
    this.sonuc = new Sonuc();
  }
  Kaydet() {
    if (this.secCevap.id == 0) {
      var tarih = new Date();
      this.secCevap.kayTarih = tarih.getTime().toString();
      this.secCevap.duzTarih = tarih.getTime().toString();
      this.servis.CevapEkle(this.secCevap).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Cevap Eklendi";
        this.CevapListe();
        this.secCevap = new Cevap();
        this.secCevap.id = 0;
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
    else {
      var tarih = new Date();
      this.secCevap.duzTarih = tarih.getTime().toString();
      this.servis.CevapDuzenle(this.secCevap).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Cevap Düzenlendi";
        this.CevapListe();
        this.Iptal();
      }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Hata Oluştu";
      });
    }
  }
}