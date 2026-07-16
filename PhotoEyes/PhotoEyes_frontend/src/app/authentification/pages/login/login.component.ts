import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
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

constructor(private fb: FormBuilder, private authService: AuthService,  private authState: AuthState,  private router: Router, private route: ActivatedRoute) {

  this.loginForm = this.fb.group({

    email: [''],
    motDePasse: ['']

  });
  }

async submit() {

  try {

    const response =await this.authService.login(this.loginForm.getRawValue());

    this.authState.setRole(response.role);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if(returnUrl){
      await this.router.navigateByUrl(returnUrl);
    } else {
      await this.router.navigate(['/']);
    }

  } catch(error) {

    console.error(error);

  }

}
}
