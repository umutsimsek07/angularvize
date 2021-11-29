import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Uye } from './models/uye';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vize';
  returnUrl = "";
  uye: Uye[];
  secUye: Uye = new Uye();
  constructor(
    public servis: DataService,
    public route: ActivatedRoute,
    public router: Router
  ) { }
  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
  }
}
