import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { ProfileFormeComponent } from '../../components/profile-forme/profile-forme.component';
import { PriceFormeComponent} from '../../components/price-forme/price-forme.component';
import { CoverUploadComponent } from '../../components/cover-upload/cover-upload.component';
import { PortfolioGridComponent } from '../../components/portfolio-grid/portfolio-grid.component';

import { PhotographerService } from '../../service/photographer.service';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CompletionBannerComponent } from "../../components/completion-banner/completion-banner.component";
import { MessageModalComponent } from '../../../shared/message-modal/message-modal.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    DashboardCardComponent,
    ProfileFormeComponent,
    PriceFormeComponent,
    CoverUploadComponent,
    PortfolioGridComponent, CompletionBannerComponent, MessageModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  dashboard!: PhotographerDashboard;

  loading = true;
  showModal = false;
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  photographerId = Number(localStorage.getItem('photoeyes.photographerId'));

  profileRequest: any = {

    description: '',
    ville:'',
    imageUrl:'',
    photoCouverture:'',
    prixPortrait:null,
    prixDemiJournee:null,
    prixJournee:null,
    specialites:[],
  };

  constructor(
    private photographerService: PhotographerService
  ) {}

  async ngOnInit() {

    if (!this.photographerId) { this.loading = false; return; }

    try{

      this.dashboard =
        await this.photographerService.getDashboard(this.photographerId);
      this.profileRequest = {
        ...this.profileRequest,
        description: this.dashboard.description,
        ville: this.dashboard.ville,
        imageUrl: this.dashboard.imageUrl,
        photoCouverture: this.dashboard.photoCouverture,
        prixPortrait: this.dashboard.prixPortrait,
        prixDemiJournee: this.dashboard.prixDemiJournee,
        prixJournee: this.dashboard.prixJournee,
        specialites: this.dashboard.specialites ?? []
      };

    }finally{

      this.loading = false;

    }

  }

  async addPortfolioPhoto(file: File){

    try{

      await this.photographerService.uploadPortfolioPhoto(

        this.photographerId,
        file

      );

      this.dashboard = {
        ...this.dashboard,
        portfolio: await this.photographerService.getPortfolio(this.photographerId)
      };

    }catch(error){

      console.error(error);

    }

  }

  async removePortfolioPhoto(id:number){

    try{

      await this.photographerService.deletePortfolioPhoto(id);

      this.dashboard = {
        ...this.dashboard,
        portfolio: await this.photographerService.getPortfolio(this.photographerId)
      };

    }catch(error){

      console.error(error);

    }

  }

  async updateImages(data: { profile?: File; cover?: File }) {
    try {
      const updates: any = {};
      if (data.profile) updates.imageUrl = await this.photographerService.uploadProfileImage(data.profile);
      if (data.cover) updates.photoCouverture = await this.photographerService.uploadProfileImage(data.cover);
      this.profileRequest = { ...this.profileRequest, ...updates };
      this.dashboard = { ...this.dashboard, ...updates };
    } catch (error) {
      this.openModal(this.getErrorMessage(error, 'Erreur lors du téléversement des photos.'), 'error');
    }
  }

  updateProfile(data:any){
    const enumByLabel: Record<string, string> = {
      Mariage: 'MARIAGE', Portrait: 'PORTRAIT', Corporate: 'CORPORATE',
      Mode: 'MODE', Grossesse: 'GROSSESSE', 'Événementiel': 'EVENEMENT',
      Immobilier: 'IMMOBILIER', Produit: 'PRODUIT'
    };
    const requestData = {
      ...data,
      ...(data.specialites ? {
        specialites: data.specialites.map((specialite: string) => enumByLabel[specialite] ?? specialite)
      } : {})
    };

    this.profileRequest = {

      ...this.profileRequest,

      ...requestData

    };
    this.dashboard = { ...this.dashboard, ...data };

  }

  async sendProfile(){

    try{

      const response =await this.photographerService.completeProfile(
      this.photographerId,
      this.profileRequest

      );
      console.log(response);
      this.dashboard = await this.photographerService.getDashboard(this.photographerId);
      this.openModal(this.dashboard.profilComplet ? "Dossier complet, en attente de validation par l'administrateur." : "Le dossier a été enregistré. Complétez les éléments manquants pour pouvoir le soumettre.", 'success');
      }catch(error){
      this.openModal(this.getErrorMessage(error, "Erreur lors de l'envoi du dossier."), 'error');

    }


  }

  private openModal(message: string, type: 'success' | 'error') {
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = false;
    setTimeout(() => this.showModal = true);
  }

  private getErrorMessage(error: any, fallback: string): string {
    const response = error?.error;
    if (typeof response === 'string' && response.trim()) {
      try {
        const parsed = JSON.parse(response);
        return parsed.message || parsed.detail || response;
      } catch {
        return response;
      }
    }
    return response?.message || response?.detail || fallback;
  }

}
