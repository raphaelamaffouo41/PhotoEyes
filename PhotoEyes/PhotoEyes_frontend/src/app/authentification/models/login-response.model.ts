export interface LoginResponse {
  message: string;
  nom: string;
  email: string;
  role: 'CLIENT' | 'PHOTOGRAPHE' | 'ADMIN';
  userId: number;
  photographerId?: number | null;
  accountStatut?: string;
  token: string;
}
