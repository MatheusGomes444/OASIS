import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamentoService } from 'src/app/services/Alojamentos.Service';

@Component({
  selector: 'app-detalhes-alojamento',
  templateUrl: './detalhes-alojamento.component.html',
  styleUrls: ['./detalhes-alojamento.component.css'],
})
export class DetalhesAlojamentoComponent implements OnInit {
  nomeAlojamento: string = '';
  imagemAlojamento: string = '';
  pet: string = '';
  sexo: string = '';
  pertences: string = '';
  refeicoes: string = '';
  moradores: any[] = []; // Lista de moradores
  alojamentoId: number | null = null; // ID do alojamento atual
  equipe: string = '';
  email: string = '';
  telefone: string = '';
  editando: boolean = false; // Controle para exibir campos de edição

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alojamentoService: AlojamentoService
  ) {}

  ngOnInit(): void {
    const alojamentoIdParam = this.route.snapshot.paramMap.get('id'); // Captura o ID do alojamento
    if (alojamentoIdParam) {
      this.alojamentoId = Number(alojamentoIdParam); // Salva o ID
      this.carregarAlojamento(this.alojamentoId); // Carrega o alojamento
    }
  }

  carregarAlojamento(id: number): void {
    this.alojamentoService.getAlojamentoById(id).subscribe(
      (alojamento) => {
        this.nomeAlojamento = alojamento.nome;
        this.imagemAlojamento = alojamento.imagem;
        this.pet = alojamento.pet;
        this.sexo = alojamento.sexo;
        this.pertences = alojamento.pertences;
        this.refeicoes = alojamento.refeicoes;
        this.moradores = alojamento.moradores; // Recebe os moradores
        this.equipe = alojamento.equipe;   // Atribuindo o valor de equipe
        this.email = alojamento.email;     // Atribuindo o valor de email
        this.telefone = alojamento.telefone; 
      },
      (error) => {
        console.error('Erro ao carregar alojamento:', error);
      }
    );
  }

  editarInformacoes(): void {
    this.editando = !this.editando;  // Alterna o estado de edição
  }

  atualizarInformacoes(): void {
    // Exibe a caixa de confirmação
    const confirmar = window.confirm('Tem certeza que deseja atualizar as informações do alojamento?');
    
    if (confirmar) {
      if (this.alojamentoId !== null) {
        const updatedInfo = {
          nomeAlojamento: this.nomeAlojamento,
          pet: this.pet,
          sexo: this.sexo,
          pertences: this.pertences,
          refeicoes: this.refeicoes,
          equipe: this.equipe,
          email: this.email,
          telefone: this.telefone
        };

        this.alojamentoService.atualizarAlojamento(this.alojamentoId, updatedInfo).subscribe(
          (response) => {
            console.log('Informações atualizadas com sucesso', response);
            alert('Informações atualizadas com sucesso!');
          },
          (error) => {
            console.error('Erro ao atualizar informações', error);
            alert('Erro ao atualizar as informações. Tente novamente.');
          }
        );
      }
    } else {
      alert('Atualização cancelada.');
    }
  }

  listarMoradores(): void {
    if (this.alojamentoId) {
      this.router.navigate(['/listar-moradores'], { queryParams: { alojamentoId: this.alojamentoId } });
    }
  }
}
