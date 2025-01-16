import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoradoresService } from 'src/app/services/MoradoresService';
import { AlojamentoService } from 'src/app/services/Alojamentos.Service';

@Component({
  selector: 'app-detalhes-moradores',
  templateUrl: './detalhes-moradores.component.html',
  styleUrls: ['./detalhes-moradores.component.css']
})
export class DetalhesMoradoresComponent implements OnInit {
  morador: any = {};
  alojamentos: any[] = [];
  novoAlojamentoId: number | null = null;
  editando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moradoresService: MoradoresService,
    private alojamentoService: AlojamentoService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.carregarMorador(id);
    this.carregarAlojamentos();
  }

  carregarMorador(id: number): void {
    this.moradoresService.getMoradorById(id).subscribe(
      (data) => {
        this.morador = data;
        console.log('Dados do morador carregados:', this.morador);
      },
      (error) => console.error('Erro ao carregar morador:', error)
    );
  }

  carregarAlojamentos(): void {
    this.alojamentoService.listarAlojamentos().subscribe(
      (data: any[]) => {
        this.alojamentos = data;
      },
      (error) => console.error('Erro ao carregar alojamentos:', error)
    );
  }

  atualizarMorador(): void {
    this.morador.ativo = this.morador.ativo === 'true' || this.morador.ativo === true;

    this.moradoresService.atualizarMorador(this.morador.id, this.morador).subscribe(
      () => {
        if (this.novoAlojamentoId) {
          this.mudarAlojamento();
        } else {
          alert('Morador atualizado com sucesso!');
        }
      },
      (error) => {
        console.error('Erro ao atualizar morador:', error);
        alert('Erro ao atualizar o morador.');
      }
    );
  }

  mudarAlojamento(): void {
    this.alojamentoService.mudarMoradorDeAlojamento(this.morador.id, this.novoAlojamentoId!).subscribe(
      () => {
        alert('Morador movido para o novo alojamento com sucesso!');
        this.carregarMorador(this.morador.id);
      },
      (error) => {
        console.error('Erro ao mover morador de alojamento:', error);
        alert('Erro ao mover o morador para o novo alojamento.');
      }
    );
  }

  alternarModoEdicao(): void {
    this.editando = !this.editando;
  }

  confirmarMudancaAlojamento(): void {
    if (!this.novoAlojamentoId) {
      alert('Selecione um alojamento para mover o morador.');
      return;
    }

    const confirmar = window.confirm('Tem certeza que deseja mover o morador para o novo alojamento?');
    if (confirmar) {
      this.mudarAlojamento();
    }
  }

  confirmarSalvar(): void {
    const confirmar = window.confirm('Tem certeza que deseja salvar as alterações?');
    if (confirmar) {
      this.atualizarMorador();
    }
  }
}
