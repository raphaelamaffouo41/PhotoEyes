import { Component } from '@angular/core';
import {CommonModule,Location} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthState } from '../../services/auth-state.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isOpen = true;

  loginForm: FormGroup;

  successMessage = '';

  errorMessage = '';

  showSuccess = false;

  showError = false;

constructor(private fb: FormBuilder, private authService: AuthService,  private authState: AuthState,  private router: Router, private route: ActivatedRoute,  private location: Location,) {

  this.loginForm = this.fb.group({

    email: [''],
    motDePasse: ['']

  });
  }

  close(): void {
  localStorage.setItem('returnUrl', this.router.url);

  this.router.navigate(['/']);
  }
  async submit() {

  this.successMessage = '';

  this.errorMessage = '';

  this.showSuccess = false;
  this.showError = false;


    try {

      const response =await this.authService.login(this.loginForm.getRawValue());

      this.authState.setRole(response.role);

      this.successMessage = response.message;
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);


    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    setTimeout(async () => {

      if (returnUrl) {
        await this.router.navigateByUrl(returnUrl);
      } else {
        await this.router.navigate(['/']);
      }

    }, 2000);

    } catch(error:any) {

      this.errorMessage = error.error?.message ?? "Une erreur est survenue.";
          this.showError = true;

      setTimeout(() => {
        this.showError = false;
      },5000);
      console.error(error);

    }

  }
}
