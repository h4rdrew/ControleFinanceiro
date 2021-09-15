import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TiposService } from './services/tipos.service';
import { CategoriasService } from './services/categorias.service';
import {
  ListagemCategoriasComponent,
  DialogExclusaoCategoriaComponent,
} from './components/Categoria/listagem-categorias/listagem-categorias.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagemCategoriasComponent,
    NovaCategoriaComponent,
    AtualizarCategoriaComponent,
    DialogExclusaoCategoriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [HttpClientModule, TiposService, CategoriasService],
  bootstrap: [AppComponent],
})
export class AppModule {}
