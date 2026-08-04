import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = 'Administrador';

  sidebarCollapsed = false;

  ngOnInit(): void {

    this.username =
      localStorage.getItem('username') || 'Administrador';

  }

  toggleSidebar(){

    this.sidebarCollapsed = !this.sidebarCollapsed;

  }

}