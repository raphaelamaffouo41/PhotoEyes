import { Component } from '@angular/core';
import { CommonModule,Location } from "@angular/common";
import { RouterLink,Router  } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {FormBuilder, FormGroup,ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  isOpen = true;

  isPhotographer = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private location: Location, private router: Router) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      numeroTelephone: [''],
      ville: [''],
      motdepasse: ['']
    });

  }
  close(): void {
    this.router.navigate(['/']);
  }
  async submit() {
      const data = {...this.registerForm.getRawValue(),
       role: this.isPhotographer ? 'PHOTOGRAPHE': 'CLIENT'
      };

    console.log(data);

    try {
      const response =
       await this.authService.register(data);
      console.log(response);

    } catch(error) {

      console.error(error);

    }

  }

  selectClient() {
    this.isPhotographer = false;
  }

  selectPhotographer() {
    this.isPhotographer = true;
  }

}
