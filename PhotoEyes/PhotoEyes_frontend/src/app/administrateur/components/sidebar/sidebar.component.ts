import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminMenu } from '../../models/admin-menu.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  menus: AdminMenu[] = [

    {
      label: 'Tableau de bord',
      icon: 'fa-solid fa-table-columns',
      route: '/admin/dashboard'
    },

    {
      label: 'Demandes',
      icon: 'fa-regular fa-bell',
      route: '/admin/matching',
    },

    {
      label: 'Validations',
      icon: 'fa-solid fa-shield-halved',
      route: '/admin/validation'
    },

    {
      label: 'Litiges',
      icon: 'fa-solid fa-scale-balanced',
      route: '/admin/litige'
    }

  ];

}