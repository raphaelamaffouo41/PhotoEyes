import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthState} from "../../../../authentification/services/auth-state.service";
import {PhotographerService} from "../../../../accueil/service/photographerservice";
import {Photographer} from "../../../../accueil/models/photographer.model";
import {ProfileHeaderComponent} from "../../../components/profile-header/profile-header.component";
import {AboutCarrdComponent} from "../../../components/about-carrd/about-carrd.component";
import {PhotographerDetail} from "../../../models/photographer-detail";
import { PhotoGrapherServices } from "../../../services/photographer.services";
import {PortfolioGalleryComponent} from "../../../components/portfolio-gallery/portfolio-gallery.component";
import {ReviewsListComponent} from "../../../components/reviews-list/reviews-list.component";
import {PricingCardComponent} from "../../../components/pricing-card/pricing-card.component";
import {HeaderComponent} from "../../../components/header/header.component";

@Component({
  selector: 'app-photographer-detail',
  standalone: true,
  imports: [ProfileHeaderComponent,AboutCarrdComponent,PortfolioGalleryComponent,ReviewsListComponent,PricingCardComponent,HeaderComponent],
  templateUrl:'./photographer-detail.component.html',
  styleUrl: './photographer-detail.component.css'
})
export class PhotographerDetailComponent implements OnInit {
  photographerDetail?: PhotographerDetail;
  private photographerId = 0;
  loading = true;
  error = false;
  notFound = false;


  constructor(
    private photographerService: PhotographerService,
    private PhotographerService: PhotoGrapherServices,
    private auth: AuthState,
    private router: Router,
    private route: ActivatedRoute) {}

async ngOnInit(): Promise<void> {

  try {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.photographerDetail =await this.PhotographerService.getById(id);

    if (!this.photographerDetail || !this.photographerDetail) {
      this.notFound = true;
    }

  } catch (e) {

    this.error = true;

  } finally {

    this.loading = false;

  }
}

  /** Bouton « Réserver » masqué pour le photographe et l'admin (non concernés). */
  get canReserve(): boolean {
    const role = this.auth.role();
    return role !== 'PHOTOGRAPHE' && role !== 'ADMIN';
  }

  /**
   * Jonction auth / opacité (conception §7). La demande ne va jamais au photographe.
   * - Visiteur      -> login puis retour sur la fiche
   * - Client connecté -> formulaire de réservation (traité par l'admin)
   */
  onReserve(): void {
    if (this.auth.role() === 'CLIENT') {
      this.router.navigate(['/reservations/nouvelle'], {
        queryParams: { photographe: this.photographerId }
      });
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: `/photographes/${this.photographerId}` }
      });
    }
  }
}
