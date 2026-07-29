import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
