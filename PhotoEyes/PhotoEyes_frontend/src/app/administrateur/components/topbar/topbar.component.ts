import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TopbarService } from '../../service/topbar.service';

@Component({

  selector: 'app-topbar',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./topbar.component.html',
  styleUrl:'./topbar.component.css'

})

export class TopbarComponent{

  constructor(public topbar:TopbarService){}

}