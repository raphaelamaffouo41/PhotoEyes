import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'CLIENT' | 'PHOTOGRAPHE' | 'ADMIN';

/**
 * État de session minimal (rôle courant).
 * Persisté en localStorage pour survivre à un rafraîchissement.
 * À brancher sur le vrai login plus tard : appeler `setRole()` après authentification.
 * Par défaut : aucun rôle => visiteur (non connecté).
 */
@Injectable({ providedIn: 'root' })
export class AuthState {
  private readonly STORAGE_KEY = 'photoeyes.role';
  readonly userId = signal<number | null>(this.readId('photoeyes.userId'));
  readonly photographerId = signal<number | null>(this.readId('photoeyes.photographerId'));
  private readonly _role = signal<UserRole | null>(this.readInitialRole());

  /** Rôle courant ou null si visiteur non connecté. */
  readonly role = this._role.asReadonly();
  readonly isLoggedIn = computed(() => this._role() !== null);

  setRole(role: UserRole | null, userId?: number, photographerId?: number | null): void {
    this._role.set(role);
    if (role) {
      localStorage.setItem(this.STORAGE_KEY, role);
      if (userId != null) { this.userId.set(userId); localStorage.setItem('photoeyes.userId', String(userId)); }
      if (photographerId !== undefined) {
        this.photographerId.set(photographerId);
        if (photographerId == null) localStorage.removeItem('photoeyes.photographerId');
        else localStorage.setItem('photoeyes.photographerId', String(photographerId));
      }
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem('token');
      localStorage.removeItem('photoeyes.userId');
      localStorage.removeItem('photoeyes.photographerId');
      this.userId.set(null); this.photographerId.set(null);
    }
  }

  logout(): void {
    this.setRole(null);
  }

  private readInitialRole(): UserRole | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'CLIENT' || stored === 'PHOTOGRAPHE' || stored === 'ADMIN'
      ? stored
      : null;
  }
  private readId(key: string): number | null {
    const value = Number(localStorage.getItem(key));
    return Number.isInteger(value) && value > 0 ? value : null;
  }
}
