import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isSidebarOpen = true; // Inicia aberto no desktop
  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit(this.isSidebarOpen);
  }

  autoCloseOnMobile() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
      this.sidebarToggled.emit(false);
    }
  }
}