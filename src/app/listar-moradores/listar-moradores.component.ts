import { Component, OnInit } from '@angular/core';

import { AlojamentoService } from '../services/Alojamentos.Service';
import { MoradoresService } from 'services/MoradoresService';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-listar-moradores',
  templateUrl: './listar-moradores.component.html',
  styleUrls: ['./listar-moradores.component.css']
})
export class ListarMoradoresComponent implements OnInit {
  alojamentoId!: number;
  nomeAlojamento: string = ''; // Nome do alojamento
  moradores: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private alojamentoService: AlojamentoService,
    private router:Router
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.alojamentoId = +queryParams['alojamentoId'];
    this.nomeAlojamento = queryParams['nomeAlojamento'];
    this.listarMoradores();
  }

  listarMoradores(): void {
    this.alojamentoService.getMoradores(this.alojamentoId).subscribe(
      (moradores) => {
        this.moradores = moradores;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar moradores:', error);
        this.loading = false;
      }
    );
  }
  detalhesMorador(id: number): void {
    this.router.navigate(['/detalhesmoradores', id]);
  }
  localizacao(morador: any) {
    // Lógica para exibir localização do morador
    console.log('Localização do morador:', morador);
  }
}
