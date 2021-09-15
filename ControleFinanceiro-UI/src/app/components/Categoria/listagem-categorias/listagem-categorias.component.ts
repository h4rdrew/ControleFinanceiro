import { CategoriasService } from './../../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss']
})
export class ListagemCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  displayedColumns: string[];

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriaService.PegarTodos().subscribe(resultado => {
      this.categorias.data = resultado;
    });

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas(): string[]{
    return ['nome', 'icone', 'tipo', 'acoes']
  }

}
