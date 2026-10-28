import { Injectable } from '@angular/core';

export interface DaySlot {
  day: number | null;
  status: 'available' | 'confirmed' | 'blocked' | 'empty';
}

@Injectable({
  providedIn: 'root'
})
class AvailabilityService {

  async getJuly2026Availabilities(): Promise<any> {
    // Grille pour Juillet 2026 (commence un mercredi, donc 2 cases vides au début)
    const days: DaySlot[] = [
      { day: null, status: 'empty' },
      { day: null, status: 'empty' },
      { day: 1, status: 'available' },
      { day: 2, status: 'available' },
      { day: 3, status: 'available' },
      { day: 4, status: 'available' },
      
      { day: 5, status: 'confirmed' },
      { day: 6, status: 'available' },
      { day: 7, status: 'available' },
      { day: 8, status: 'blocked' },
      { day: 9, status: 'blocked' },
      { day: 10, status: 'available' },
      { day: 11, status: 'available' },
      
      { day: 12, status: 'confirmed' },
      { day: 13, status: 'available' },
      { day: 14, status: 'available' },
      { day: 15, status: 'available' },
      { day: 16, status: 'available' },
      { day: 17, status: 'available' },
      { day: 18, status: 'available' },
      
      { day: 19, status: 'confirmed' },
      { day: 20, status: 'available' },
      { day: 21, status: 'available' },
      { day: 22, status: 'blocked' },
      { day: 23, status: 'available' },
      { day: 24, status: 'available' },
      { day: 25, status: 'available' },
      
      { day: 26, status: 'available' },
      { day: 27, status: 'available' },
      { day: 28, status: 'available' },
      { day: 29, status: 'available' },
      { day: 30, status: 'available' },
      { day: 31, status: 'available' }
    ];

    return Promise.resolve({
      title: 'Disponibilités — Juillet 2026',
      subtitle: "Marquez vos créneaux. L'admin les consulte pour le matching (jamais le client).",
      days: days
    });
  }
}

export { AvailabilityService };