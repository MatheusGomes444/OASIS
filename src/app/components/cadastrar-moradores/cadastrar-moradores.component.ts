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
    this.carregarAlojamentos();
  }

  carregarAlojamentos(): void {
    this.alojamentoService.getAlojamentos().subscribe({
      next: (data) => {
        this.alojamentos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar alojamentos:', err);
        this.toastr.error('Erro ao carregar alojamentos. Tente novamente.', 'Erro');
      }
    });
  }

  cadastrarMorador(): void {
    if (this.form.valid) {
      // Exibe a caixa de confirmação
      const confirmar = window.confirm('corfirmar as informações do morador');
      
      if (confirmar) {
        const novoMorador: Morador = { ...this.form.value };

        this.cadastrarMoradorService.cadastrar(novoMorador).subscribe({
          next: () => {
            this.toastr.success('Morador cadastrado com sucesso!', 'Sucesso');
            this.router.navigate(['/moradores']);
          },
          error: (err) => {
            console.error('Erro ao cadastrar morador:', err);
            this.toastr.error('Erro ao cadastrar morador. Tente novamente.', 'Erro');
          }
        });
      } else {
        this.toastr.info('Cadastro cancelado.', 'Informação');
      }
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios.', 'Atenção');
    }
  }

  voltar(): void {
    this.form.reset();
  }
}
