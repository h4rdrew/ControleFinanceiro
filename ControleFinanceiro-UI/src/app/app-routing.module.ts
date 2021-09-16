import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';
import { ListagemFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'categorias/listagemcategorias',
    component: ListagemCategoriasComponent,
  },
  {
    path: 'categorias/novacategoria',
    component: NovaCategoriaComponent,
  },
  {
    path: 'categorias/atualizarcategoria/:id',
    component: AtualizarCategoriaComponent,
  },
  {
    path: 'funcoes/listagemfuncoes',
    component: ListagemFuncoesComponent,
  },
  {
    path: 'funcoes/novafuncao',
    component: NovaFuncaoComponent,
  },
  {
    path: 'funcoes/atualizarfuncao/:id',
    component: AtualizarFuncaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
