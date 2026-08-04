import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {

  private API = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  async getDashboard(id:number){

    return await firstValueFrom(

      this.http.get<any>(
        `${this.API}/photographers/${id}/dashboard`
      )

    );

  }

  async completeProfile(id:number,data:any){

    return await firstValueFrom(

      this.http.put(

        `${this.API}/photographers/${id}/complete-profile`,
        data

      )

    );

  }

  async uploadPortfolioPhoto(photographerId:number,file:File){

    const formData=new FormData();

    formData.append("file",file);

    formData.append(
      "photographerId",
      photographerId.toString()
    );

    return await firstValueFrom(

      this.http.post(
        `${this.API}/gallery/create`,
        formData
      )

    );

  }

  async getPortfolio(id:number){

    return await firstValueFrom(

      this.http.get<any[]>(

        `${this.API}/gallery/photographer/${id}`

      )

    );

  }

  async deletePortfolioPhoto(id:number){

    return await firstValueFrom(

      this.http.delete(
        `${this.API}/gallery/${id}`
      )

    );

  }

}