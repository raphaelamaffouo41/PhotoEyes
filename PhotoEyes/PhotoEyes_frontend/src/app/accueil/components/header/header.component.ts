import { Component } from '@angular/core';
import {RouterLink,Router} from '@angular/router'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor(private router: Router) {}

  goToLogin() {

    const currentUrl = this.router.url;

    this.router.navigate(
      ['/auth/login'],
      {
        queryParams: {
          returnUrl: currentUrl
        }
      }
    );

  }

  goToRegister() {

    const currentUrl = this.router.url;

    this.router.navigate(
      ['/auth/register'],
      {
        queryParams: {
          returnUrl: currentUrl
        }
      }
    );

  }

}
