import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginPage } from './Auth/login-page/login-page';
import { Header } from './Main Pages/header/header';
import { Loading } from './Services/loading';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Family_App');

  loading$!: Observable<boolean>;
  constructor(private loadingService: Loading) { }

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;

  }
}