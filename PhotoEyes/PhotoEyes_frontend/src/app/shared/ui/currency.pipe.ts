import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formate un montant en francs CFA : 45000 -> "45 000 FCFA".
 */
@Pipe({ name: 'fcfa', standalone: true })
export class FcfaPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;
  }
}
