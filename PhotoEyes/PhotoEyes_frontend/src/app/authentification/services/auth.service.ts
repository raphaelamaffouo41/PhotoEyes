import {Injectable, inject} from "@angular/core";
import {Photographer} from "../../accueil/models/photographer.model";
import { LoginResponse } from '../models/login-response.model';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { RegisterResponse } from "../models/register-response.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}
  

  async register(data: any): Promise<RegisterResponse> {

    return await firstValueFrom(

      this.http.post<RegisterResponse>(
        `${this.API}/register`,
        data
      )

    );

  }

    async login(data: any): Promise<LoginResponse> {

        const response = await firstValueFrom(
          this.http.post<LoginResponse>(
            `${this.API}/login`,
            data
          )
      );

      localStorage.setItem(
        'token',
        response.token
      );


      return response;
  }
}