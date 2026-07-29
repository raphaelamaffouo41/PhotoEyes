import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { AdminPhotographer } from '../models/admin-photographer.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private API = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) {}

  async getPendingPhotographers(): Promise<AdminPhotographer[]> {

    return await firstValueFrom(

      this.http.get<AdminPhotographer[]>(
        `${this.API}/photographers/pending`
      )

    );

  }

  async validate(userId:number){

    return await firstValueFrom(

      this.http.put(

        `${this.API}/photographers/${userId}/validate`,
        {}

      )

    );

  }

  async reject(userId:number){

    return await firstValueFrom(

      this.http.put(

        `${this.API}/photographers/${userId}/reject`,
        {}

      )

    );

  }

}