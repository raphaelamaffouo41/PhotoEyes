import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly brandName = 'StudioLink';

  readonly currentYear = new Date().getFullYear();

  readonly linkGroups: FooterLinkGroup[] = [
    {
      title: 'À propos',
      links: [
        { label: 'Qui suis-je ?', url: 'https://reservezunphotographe.fr/qui-suis-je/' },
        { label: "Centre d'aide", url: 'https://reservezunphotographe.fr/centre-daide' },
        { label: 'Blog', url: 'https://reservezunphotographe.fr/blog/' },
        { label: 'Contactez-nous', url: 'https://reservezunphotographe.fr/contactez-nous/' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Photographes', url: 'https://reservezunphotographe.fr/services-pour-photographes/' },
        { label: 'Prestataires du secteur', url: 'https://reservezunphotographe.fr/services-pour-autres-professionnels/' },
        { label: 'Vendeurs matériel photo', url: 'https://reservezunphotographe.fr/services-pour-vendeurs-de-materiel-photo/' },
        { label: 'Particuliers', url: 'https://reservezunphotographe.fr/services-pour-particuliers/' },
      ],
    },
    {
      title: 'Informations légales',
      links: [
        { label: 'Mentions légales', url: 'https://reservezunphotographe.fr/mentions-legales/' },
        { label: 'CGU', url: 'https://reservezunphotographe.fr/cgu/' },
        { label: 'CGPS', url: 'https://reservezunphotographe.fr/cgps/' },
        { label: 'Politique de confidentialité', url: 'https://reservezunphotographe.fr/politique-de-protection-des-donnees-personnelles/' },
        { label: 'Gestion des cookies', url: 'https://reservezunphotographe.fr/politique-relative-a-la-gestion-des-cookies/' },
      ],
    },
  ];

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
