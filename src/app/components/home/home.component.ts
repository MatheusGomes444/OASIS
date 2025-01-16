import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = null;

  ngOnInit(): void {
    // Recuperar o nome de usuário do localStorage
    this.username = localStorage.getItem('username');
    
    // Exibir alerta de boas-vindas se o nome de usuário estiver disponível
    if (this.username) {
      alert(`Bem-vindo, ${this.username}!`);
    } else {
      alert('Bem-vindo ao nosso site!');
    }
  }
}