import { IProduto } from './../../model/IProduto.model';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
 export class ListaProdutosComponent implements OnInit {

  listaProdutos: IProduto[] = [];

  constructor(private produtosService: ProdutosService) {
    /*for (let item of this.listaStrings)
    {
      console.log(item);
    }

    for(const item of this.listaNumeros)
    {
      console.log(item);
    }

    console.log(this.objetoModelo);
    console.log(this.objetoModelo.nome);*/
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
  carregarProdutos(): void{
    this.produtosService.buscarTodos().subscribe((retorno: any) =>{
      this.listaProdutos = retorno;
    })
  }
  deletar(produto:IProduto): void {
    this.produtosService.excluir(produto.id!).subscribe(() => {
      this.produtosService.exibirMensagem(
        'SISTEMA',
        `${produto.nome} foi excluido com sucesso!`,
        'toast-erro'
      );
      this.carregarProdutos();
    });
  }

  }
