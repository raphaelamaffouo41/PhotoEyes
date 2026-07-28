import { Component } from '@angular/core';
import { CommonModule,Location } from "@angular/common";
import { RouterLink,Router  } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {FormBuilder, FormGroup,ReactiveFormsModule,Validators,AbstractControl,ValidationErrors} from "@angular/forms";
import { MessageModalComponent } from "../../../shared/message-modal/message-modal.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MessageModalComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  isOpen = true;

  isPhotographer = false;

  successMessage = '';

  errorMessage = '';

  showSuccess = false;
  showError = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private location: Location, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      numeroTelephone: ['',Validators.required],
      ville: ['',Validators.required],
      motdepasse: ['',[Validators.required,Validators.minLength(8)]],
      confirmerMotdepasse: ['', Validators.required]
    });

  }
  get f(){
    return this.registerForm.controls;

  }
  close(): void {
    localStorage.setItem('returnUrl', this.router.url);

    this.router.navigate(['/']);
  }

  async submit() {
    if(
      this.registerForm.controls['email'].invalid
      ){
      this.errorMessage="Adresse email invalide.";

      this.showError=true;

      setTimeout(()=>{

      this.showError=false;

      },3000);

      return;

    }

    this.showSuccess = false;
    this.showError = false;

    const motdepasse =this.registerForm.value.motdepasse;

    const confirmation =this.registerForm.value.confirmerMotdepasse;

    if(motdepasse !== confirmation){

        this.errorMessage ="Les mots de passe ne correspondent pas.";

        this.showError = true;

        setTimeout(()=>{
            this.showError=false;
        },3000);

        return;

    }

    if(this.registerForm.invalid){

      this.errorMessage =
      "Veuillez remplir tous les champs.";

      this.showError=true;

      setTimeout(()=>{

          this.showError=false;

      },3000);

      return;
    }

    const data = {

      ...this.registerForm.getRawValue(),

      role: this.isPhotographer ? 'PHOTOGRAPHE' : 'CLIENT'

    };

    this.successMessage = '';

    this.errorMessage = '';

    try {
      const formValue =
        this.registerForm.getRawValue();
        const data = {

        nom:formValue.nom,

        prenom:formValue.prenom,

        email:formValue.email,

        numeroTelephone:formValue.numeroTelephone,

        ville:formValue.ville,

        motdepasse:formValue.motdepasse,
        
        role:this.isPhotographer?'PHOTOGRAPHE':'CLIENT'

      };

      const response = await this.authService.register(data);

      this.successMessage = response.message;

      this.showSuccess = true;
      localStorage.setItem(
        'photoeyes.lastRegister',
        JSON.stringify({
          email: this.registerForm.value.email,
          motDePasse: this.registerForm.value.motdepasse
        })
      );

      setTimeout(async () => {

        await this.router.navigate(['/auth/login']);

      },3000);

      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);

      console.log(response);

    } catch (error: any) {

      this.errorMessage = error.error?.message ?? "Une erreur est survenue.";

      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000);


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
