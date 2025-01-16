import { Component, OnInit } from '@angular/core';
import { AlojamentoService } from 'src/app/services/Alojamentos.Service';

@Component({
  selector: 'app-alojamentos',
  templateUrl: './alojamentos.component.html',
  styleUrls: ['./alojamentos.component.css'],
})
export class AlojamentosComponent implements OnInit {
  alojamentos: any[] = []; // Lista de alojamentos inicializada vazia
  errorMessage: string = ''; // Variável para armazenar mensagens de erro

  constructor(private alojamentoService: AlojamentoService) {}

  ngOnInit(): void {
    this.carregarAlojamentos(); // Carregar dados ao inicializar o componente
  }

  carregarAlojamentos(): void {
    this.alojamentoService.listarAlojamentos().subscribe({
      next: (data) => {
        this.alojamentos = data; // Os dados agora incluem capacidade máxima e quantidade de moradores
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os alojamentos.';
        console.error(err);
      },
    });
  }
  
}
