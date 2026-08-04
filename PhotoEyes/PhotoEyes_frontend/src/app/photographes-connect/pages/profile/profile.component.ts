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
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    DashboardCardComponent,
    ProfileFormeComponent,
    PriceFormeComponent,
    CoverUploadComponent,
    PortfolioGridComponent, CompletionBannerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  dashboard!: PhotographerDashboard;

  loading = true;

  photographerId = 1; // plus tard on utilisera le JWT

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

    try{

      this.dashboard =
        await this.photographerService.getDashboard(this.photographerId);

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

      this.dashboard.portfolio =
        await this.photographerService.getPortfolio(
          this.photographerId
        );

    }catch(error){

      console.error(error);

    }

  }

  async removePortfolioPhoto(id:number){

    try{

      await this.photographerService.deletePortfolioPhoto(id);

      this.dashboard.portfolio =
        await this.photographerService.getPortfolio(
          this.photographerId
        );

    }catch(error){

      console.error(error);

    }

  }

  updateImages(data:any){

  console.log("Images reçues",data);

  this.profileRequest={

  ...this.profileRequest,

  imageUrl:data.profile,

  photoCouverture:data.cover

  };


  }

  updateProfile(data:any){

    this.profileRequest = {

      ...this.profileRequest,

      ...data

    };

    console.log("Données avant envoi :",this.profileRequest);

  }

  async sendProfile(){

    try{

      const response =await this.photographerService.completeProfile(
      this.photographerId,
      this.profileRequest

      );
      console.log(response);
      alert("Profil envoyé pour validation");
      }catch(error){
      console.error(error);
      alert("Erreur lors de l'envoi");

    }


  }

}