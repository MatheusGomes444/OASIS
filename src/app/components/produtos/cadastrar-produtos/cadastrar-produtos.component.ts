import { ProdutosService } from 'src/app/services/produtos.service';
import { IProduto } from '../../model/IProduto.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit  {

  produto: IProduto = {
    nome: '',
    validade: new Date(),
    precoProduto:0
  };
  constructor(private ProdutosService: ProdutosService, private router: Router) { }

  ngOnInit(): void {

   }

  salvarProduto(): void {
    this.ProdutosService.cadastrar(this.produto).subscribe(retorno => {
     this.produto = retorno;
      this.ProdutosService.exibirMensagem(
        'Sistema',
        `${this.produto.nome} foi cadastrado com sucesso. ID: ${this.produto.id}`,
        'toast-success'

      );
      this.router.navigate(['/produtos']);

    });

  }
}
