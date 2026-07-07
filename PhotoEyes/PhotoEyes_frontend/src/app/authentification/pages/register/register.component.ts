import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink  } from '@angular/router';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      ville: [''],
      motdepasse: ['']
    });

  }

  async submit() {
    console.log(this.registerForm.getRawValue());
    try {
      const response =
        await this.authService.register(
          this.registerForm.getRawValue()
        );

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
