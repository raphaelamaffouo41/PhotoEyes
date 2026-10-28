
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityService, DaySlot } from '../../service/avialability.service';

@Component({
  selector: 'app-disponibiliter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disponibiliter.component.html',
  styleUrls: ['./disponibiliter.component.css']
})
export class DisponibiliterComponent implements OnInit {
  title = '';
  subtitle = '';
  calendarDays: DaySlot[] = [];
  weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  constructor(private availabilityService: AvailabilityService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.availabilityService.getJuly2026Availabilities();
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.calendarDays = data.days;
    } catch (error) {
      console.error('Erreur lors du chargement des disponibilités', error);
    }
  }

  // Permet de modifier le statut d'un jour au clic (optionnel)
  toggleDay(slot: DaySlot) {
    if (slot.day === null || slot.status === 'confirmed') return;
    
    if (slot.status === 'available') {
      slot.status = 'blocked';
    } else if (slot.status === 'blocked') {
      slot.status = 'available';
    }
  }
}