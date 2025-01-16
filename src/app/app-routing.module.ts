import { AlojamentosComponent } from './components/alojamentos/alojamentos.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarMoradoresComponent } from './listar-moradores/listar-moradores.component';
import { HomeComponent } from './components/home/home.component';

import { CadastrarMoradoresComponent } from './components/cadastrar-moradores/cadastrar-moradores.component';
import { MoradoresComponent } from './components/moradores/moradores.component';
import { DetalhesMoradoresComponent } from './components/detalhes-moradores/detalhes-moradores.component';
import { AlbergueComponent } from './components/albergue/albergue.component';
import { DetalhesAlojamentoComponent } from './components/detalhes-alojamento/detalhes-alojamento.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'alojamentos', component: AlojamentosComponent},
  { path: 'detalhesmoradores/:id', component: DetalhesMoradoresComponent },

  { path: 'moradores/:id', component: MoradoresComponent },
  {path: 'moradores', component: MoradoresComponent},
  { path: 'cadastrarmoradores', component: CadastrarMoradoresComponent },
  {path:'albergue', component:AlbergueComponent},
  {path:'detalhesalojamento', component:DetalhesAlojamentoComponent},
  { path: 'detalhesalojamento/:id', component: DetalhesAlojamentoComponent },
  { path: 'moradores/:alojamentoId', component: ListarMoradoresComponent },
  { path: '', component: MoradoresComponent },
  { path: 'detalhesmoradores/:id', component: DetalhesMoradoresComponent },
  { path: 'alojamento/:id/moradores', component: ListarMoradoresComponent },
  { path: 'listar-moradores', component: ListarMoradoresComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
