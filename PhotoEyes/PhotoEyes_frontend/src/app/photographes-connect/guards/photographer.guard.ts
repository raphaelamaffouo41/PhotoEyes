import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../../authentification/services/auth-state.service';

export const photographerGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthState);
  const router = inject(Router);
  if (auth.role() === 'PHOTOGRAPHE' && auth.photographerId()) return true;
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
