import { Component } from '@angular/core';

import { ValidationListComponent } from "../../components/validation-list/validation-list.component";
import { AdminService } from '../../service/admin.service';
import { AdminPhotographer } from '../../models/admin-photographer.model';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [ ValidationListComponent],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {
  constructor(private adminService:AdminService){}

  photographers:AdminPhotographer[]=[];

async ngOnInit(){

  this.photographers =
  await this.adminService.getPendingPhotographers();

}
}
