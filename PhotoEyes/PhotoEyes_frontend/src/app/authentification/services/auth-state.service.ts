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
  private readonly _role = signal<UserRole | null>(this.readInitialRole());

  /** Rôle courant ou null si visiteur non connecté. */
  readonly role = this._role.asReadonly();
  readonly isLoggedIn = computed(() => this._role() !== null);

  setRole(role: UserRole | null): void {
    this._role.set(role);
    if (role) {
      localStorage.setItem(this.STORAGE_KEY, role);
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
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
}
