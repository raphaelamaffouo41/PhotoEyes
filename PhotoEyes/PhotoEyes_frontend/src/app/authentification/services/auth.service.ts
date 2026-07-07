import {Injectable, inject} from "@angular/core";
import {Photographer} from "../../accueil/models/photographer.model";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private API = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}

  async register(data: any) {

    return await firstValueFrom(

      this.http.post(
        `${this.API}/register`,
        data
      )

    );
  }
}
