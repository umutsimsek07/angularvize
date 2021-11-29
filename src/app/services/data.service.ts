import { Cevap } from './../models/cevap';
import { Soru } from './../models/soru';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anket } from '../models/anket';
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiURL = "http://localhost:3000/";
  constructor(
    public http: HttpClient
  ) { }
  // üyler servisi başlangıç
  OturumKontrol() {
    var token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  UyeLogin(k: string, p: string) {
    return this.http.get(this.apiURL + "uye?kadi=" + k + "&parola=" + p);
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


  ParolaUret(s: number) {
    var st: string = "qwertyuiopasdfghjklzxcvbnm0123456789";
    var p = "";
    for (let i = 0; i < s; i++) {
      var r = Math.floor(Math.random() * st.length);
      p += st.charAt(r);

    }
    return p;
  }




  UyeEkle(uye: Uye) {
    return this.http.post(this.apiURL + "uye", uye)
  }

  UyeSil(id: number) {
    return this.http.delete(this.apiURL + "uye/" + id);
  }


  UyeListele(ara: string) {
    return this.http.get(this.apiURL + "uye?q=" + ara);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiURL + "uye/" + uye.id, uye);
  }
  uyeYetkilendir(uye: Uye) {
    return this.http.put(this.apiURL + "uye/" + uye.id, uye);
  }

  UyebyId(id: number) {
    return this.http.get(this.apiURL + "uye/" + id);
  }

  // üyeler servisi bitiş

  // anket servisi başlangıç
  AnketListele(ara:any, sira: any) {
    return this.http.get(this.apiURL + "anketler?q=" + ara + "&_sort=" + sira);
  }
  AnketSayfala(p: number, lim: number) {
    return this.http.get(this.apiURL + "anketler?_page=" + p + "&_limit=" + lim);
  }
  AnketById(id: number) {
    return this.http.get(this.apiURL + "anketler/" + id);
  }
  AnketEkle(anket: Anket) {
    return this.http.post(this.apiURL + "anketler", anket);
  }
  AnketDuzenle(anket: Anket) {
    return this.http.put(this.apiURL + "anketler/" + anket.id, anket);
  }
  AnketSil(id: number) {
    return this.http.delete(this.apiURL + "anketler/" + id );
  }

  // anket servisi bitiş

  // sorular servisi başlangıç
  SoruListeleByAnketId(aId: number) {
    return this.http.get(this.apiURL + "soru?anketById="+ aId);
  }
  SoruById(id: number) {
    return this.http.get(this.apiURL + "soru/" + id);
  }
  SoruEkle(soru: Soru) {
    return this.http.post(this.apiURL + "soru", soru);
  }
  SoruDuzenle(soru: Soru) {
    return this.http.put(this.apiURL + "soru/" + soru.id, soru);
  }
  SoruSil(id: number) {
    return this.http.delete(this.apiURL + "soru/" + id)
  }
  // sorular servisi bitiş

  // cevap servisi başlangıç
  CevapListeleBySoruId(cId: number) {
    return this.http.get(this.apiURL + "cevap?soruById="+ cId);
  }
  CevapById(id: number) {
    return this.http.get(this.apiURL + "cevap/" + id);
  }
  CevapEkle(cevap: Cevap) {
    return this.http.post(this.apiURL + "cevap", cevap);
  }
  CevapDuzenle(cevap: Cevap) {
    return this.http.put(this.apiURL + "cevap/" + cevap.id, cevap);
  }
  CevapSil(id: number) {
    return this.http.delete(this.apiURL + "cevap/" + id)
  }
  // cevap servisi bitiş
}
