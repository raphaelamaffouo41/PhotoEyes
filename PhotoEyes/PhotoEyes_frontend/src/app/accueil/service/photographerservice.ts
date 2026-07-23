import { Injectable } from '@angular/core';
import { Photographer } from '../models/photographer.model';
import { SearchCriteria } from '../models/search-criteria.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {

  // Données de démonstration (mock). À remplacer par un appel HttpClient :
  //   return firstValueFrom(this.http.get<Photographer[]>('/api/public/photographes'));
 private api = 'http://localhost:8080/api/photographers';

  constructor(private http: HttpClient) {}

  getAll(): Promise<Photographer[]> {
    return firstValueFrom(
      this.http.get<Photographer[]>(this.api)
    );
  }

  getById(id:number): Promise<Photographer> {
    return firstValueFrom(
      this.http.get<Photographer>(`${this.api}/${id}`)
    );
  }
  
  //async search(criteria: SearchCriteria): Promise<Photographer[]> {
   // const kw = criteria.keyword.trim().toLowerCase();
   // const city = criteria.city.trim().toLowerCase();
   // return this.photographers.filter(p => {
   //   const matchKeyword = !kw
   //     || p.nom.toLowerCase().includes(kw)
    //    || p.specialite.toLowerCase().includes(kw);
    //  const matchCity = !city || p.ville.toLowerCase().includes(city);
    //  return matchKeyword && matchCity;
  //  });
 // }
}
