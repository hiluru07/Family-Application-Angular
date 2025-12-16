import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css'
})
export class ErrorPage {
  code = '';
  title = '';
  message = '';
  actionText = 'Go Home';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.code = this.route.snapshot.queryParamMap.get('code') ?? 'error';
    this.setError(this.code);
  }

  setError(code: string) {
    switch (code) {
      case '0':
        this.title = 'Connection Lost';
        this.message = 'Unable to reach server. Please check your internet connection.';
        break;

      case '401':
        this.title = 'Session Expired';
        this.message = 'Your login session has expired. Please login again.';
        this.actionText = 'Login';
        break;

      case '500':
        this.title = 'Server Error';
        this.message = 'Something went wrong on our side. Try again later.';
        break;

      default:
        this.title = 'Unexpected Error';
        this.message = 'Something went wrong.';
    }
  }

  action() {
    if (this.code === '401') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
