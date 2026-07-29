import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TopbarService {
  search = signal('');
  notificationCount = signal(3);
  adminName = signal('Administrateur');
  adminCity = signal('Yaoundé');
}

