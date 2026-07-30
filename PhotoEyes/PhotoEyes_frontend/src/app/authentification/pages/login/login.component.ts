import { Component, OnInit } from '@angular/core';
import {CommonModule,Location} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthState } from '../../services/auth-state.service';
import { MessageModalComponent } from "../../../shared/message-modal/message-modal.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MessageModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isOpen = true;

  loginForm: FormGroup;

  successMessage = '';

  errorMessage = '';

  showSuccess = false;

  showError = false;

ngOnInit(): void {

  const saved = localStorage.getItem('photoeyes.lastRegister');

  if(saved){

    const user = JSON.parse(saved);

    this.loginForm.patchValue({

      email: user.email,

      motDePasse: user.motDePasse

    });

  }

}

constructor(private fb: FormBuilder, private authService: AuthService,  private authState: AuthState,  private router: Router, private route: ActivatedRoute,  private location: Location,) {

  this.loginForm = this.fb.group({

    email: ['',[Validators.required,Validators.email]],
    motDePasse: ['',[Validators.required,Validators.minLength(8)]]

  });
  }

  get f(){
    return this.loginForm.controls;

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
      localStorage.removeItem('photoeyes.lastRegister');

      this.successMessage = response.message;
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    setTimeout(async () => {
       this.authState.setRole(response.role);

      if(response.role === 'ADMIN'){

        await this.router.navigate(['/admin']);

      }
      else{

        const returnUrl =
            this.route.snapshot.queryParamMap.get('returnUrl');

        if(returnUrl){

            await this.router.navigateByUrl(returnUrl);

        }else{

            await this.router.navigate(['/']);

        }

      }

    }, 2000);

    } catch(error:any) {

      this.errorMessage = error.error?.message ?? "Une erreur est survenue.";
          this.showError = true;

      setTimeout(() => {
        this.showError = false;
      },3000);
      console.error(error);

    }

  }
}
