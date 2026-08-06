import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastrarMoradorService } from 'services/CadastrarMoradorService';
import { AlojamentoService } from 'src/app/services/Alojamentos.Service';
import { Morador } from '../model/Morador.model';

@Component({
  selector: 'app-cadastrar-moradores',
  templateUrl: './cadastrar-moradores.component.html',
  styleUrls: ['./cadastrar-moradores.component.css']
})
export class CadastrarMoradoresComponent implements OnInit {
  form: FormGroup;
  alojamentos: any[] = [];

  // Controla o spinner/estado de carregamento do botão "Salvar"
  salvando = false;

  // Controla o estado de carregamento do select de alojamentos
  carregandoAlojamentos = false;

  // Indica se a busca de alojamentos já foi feita ao menos uma vez
  // (usado pra só exibir "nenhum alojamento encontrado" depois de tentar buscar)
  alojamentosCarregados = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cadastrarMoradorService: CadastrarMoradorService,
    private alojamentoService: AlojamentoService
  ) {
    this.form = new FormGroup({
      Nome: new FormControl('', Validators.required),
      CPF: new FormControl('', Validators.nullValidator),
      RG: new FormControl('', Validators.nullValidator),
      Telefone: new FormControl('', Validators.nullValidator),
      Endereco: new FormControl('', Validators.nullValidator),
      Sexo: new FormControl('', Validators.nullValidator),
      Idade: new FormControl('', Validators.nullValidator),
      Nacionalidade: new FormControl('', Validators.nullValidator),
      Observacoes: new FormControl('', Validators.nullValidator),
      AlojamentoId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  // Busca os alojamentos só quando o usuário abre o select (evita
  // mostrar "nenhum alojamento encontrado" antes de ele tentar ver a lista)
  onFocusAlojamento(): void {
    if (this.alojamentosCarregados || this.carregandoAlojamentos) {
      return;
    }
    this.carregarAlojamentos();
  }

  carregarAlojamentos(): void {
    this.carregandoAlojamentos = true;

    this.alojamentoService.getAlojamentos().subscribe({
      next: (data) => {
        this.alojamentos = data;
        this.carregandoAlojamentos = false;
        this.alojamentosCarregados = true;
      },
      error: (err) => {
        console.error('Erro ao carregar alojamentos:', err);
        this.toastr.error('Erro ao carregar alojamentos. Tente novamente.', 'Erro');
        this.carregandoAlojamentos = false;
        this.alojamentosCarregados = false;
      }
    });
  }

  // Helper usado no template para exibir erro só depois que o campo foi tocado
  campoInvalido(nomeCampo: string): boolean {
    const campo = this.form.get(nomeCampo);
    return !!campo && campo.invalid && (campo.dirty || campo.touched);
  }

  cadastrarMorador(): void {
    if (this.form.valid) {
      const confirmar = window.confirm('Confirmar as informações do morador?');

      if (confirmar) {
        this.salvando = true;
        const novoMorador: Morador = { ...this.form.value };

        this.cadastrarMoradorService.cadastrar(novoMorador).subscribe({
          next: () => {
            this.salvando = false;
            this.toastr.success('Morador cadastrado com sucesso!', 'Sucesso');
            this.router.navigate(['/moradores']);
          },
          error: (err) => {
            this.salvando = false;
            console.error('Erro ao cadastrar morador:', err);
            this.toastr.error('Erro ao cadastrar morador. Tente novamente.', 'Erro');
          }
        });
      } else {
        this.toastr.info('Cadastro cancelado.', 'Informação');
      }
    } else {
      this.form.markAllAsTouched();
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios.', 'Atenção');
    }
  }

  voltar(): void {
    this.form.reset();
    this.router.navigate(['/moradores']);
  }
}