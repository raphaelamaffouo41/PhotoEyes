import { Injectable } from '@angular/core';
import { Photographer } from '../models/photographer.model';
import { SearchCriteria } from '../models/search-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {

  // Données de démonstration (mock). À remplacer par un appel HttpClient :
  //   return firstValueFrom(this.http.get<Photographer[]>('/api/public/photographes'));
  private readonly photographers: Photographer[] = [
    { id: 1, nom: 'Marlène Atangana', ville: 'Yaoundé',   specialite: 'Mariage & Événementiel', note: 4.9, prixDepart: 45000, imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', verifie: true, photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg' },
    { id: 2, nom: 'Hervé Nkoulou',    ville: 'Douala',    specialite: 'Portrait & Corporate',   note: 4.7, prixDepart: 35000, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', verifie: true ,photoCouverture:'https://www.bing.com/th/id/OIP.yGPTLUhR_y5baA5BoZlmLAHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2'},
    { id: 3, nom: 'Sandrine Bilong',  ville: 'Yaoundé',   specialite: 'Mode & Studio',          note: 4.8, prixDepart: 60000, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', verifie: true ,photoCouverture:'https://www.bing.com/th/id/OIP.yGPTLUhR_y5baA5BoZlmLAHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2'},
    { id: 4, nom: 'Aïcha Fouda',      ville: 'Douala',    specialite: 'Grossesse & Naissance',  note: 5.0, prixDepart: 40000, imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80', verifie: true ,photoCouverture:'https://www.bing.com/th/id/OIP.yGPTLUhR_y5baA5BoZlmLAHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2'},
    { id: 5, nom: 'Patrick Mbarga',   ville: 'Bafoussam', specialite: 'Événementiel',           note: 4.6, prixDepart: 30000, imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', verifie: false ,photoCouverture:'https://www.bing.com/th/id/OIP.yGPTLUhR_y5baA5BoZlmLAHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2'},
    { id: 6, nom: 'Joël Tchamba',     ville: 'Yaoundé',   specialite: 'Immobilier & Produit',   note: 4.5, prixDepart: 25000, imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', verifie: true,photoCouverture:'https://www.bing.com/th/id/OIP.yGPTLUhR_y5baA5BoZlmLAHaE8?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2'}
  ];

  async getAll(): Promise<Photographer[]> {
    return this.photographers;
  }
  async getById(id: number): Promise< Photographer | undefined> {
    return this.photographers.find(p=>p.id === id);
  }

  async search(criteria: SearchCriteria): Promise<Photographer[]> {
    const kw = criteria.keyword.trim().toLowerCase();
    const city = criteria.city.trim().toLowerCase();
    return this.photographers.filter(p => {
      const matchKeyword = !kw
        || p.nom.toLowerCase().includes(kw)
        || p.specialite.toLowerCase().includes(kw);
      const matchCity = !city || p.ville.toLowerCase().includes(city);
      return matchKeyword && matchCity;
    });
  }
}
